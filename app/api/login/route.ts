import { NextResponse } from "next/server";
import { logger } from "../../lib/logger";

export const dynamic = "force-dynamic";

function noStore(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}

function maskIdentifier(identifier: string) {
  const [name, domain] = identifier.split("@");
  const first = name?.slice(0, 1) || "?";
  return `${first}${"*".repeat(Math.min(Math.max((name?.length ?? 1) - 1, 2), 8))}@${domain}`;
}

async function readPayload(request: Request) {
  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";

  if (
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data")
  ) {
    const formData = await request.formData();
    return {
      source: "form-data",
      payload: Object.fromEntries(formData.entries()),
    } as const;
  }

  return {
    source: "json",
    payload: await request.json(),
  } as const;
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  const contentType = request.headers.get("content-type");

  logger.info("login.request_received", { requestId, contentType });

  if (process.env.NODE_ENV !== "development") {
    logger.warn("login.request_rejected", {
      requestId,
      reason: "development_only",
    });
    return noStore({ message: "This endpoint is available in local development only." }, 404);
  }

  let payload: unknown;
  let source: "json" | "form-data";
  try {
    const parsed = await readPayload(request);
    payload = parsed.payload;
    source = parsed.source;
  } catch (error) {
    logger.warn("login.payload_parse_failed", {
      requestId,
      error: error instanceof Error ? error.message : "Unknown parsing error",
    });
    return noStore({ message: "Send valid JSON or form data." }, 400);
  }

  if (!payload || typeof payload !== "object") {
    logger.warn("login.validation_failed", { requestId, reason: "missing_payload" });
    return noStore({ message: "Missing demo values." }, 400);
  }

  const { identifier, passphrase } = payload as Record<string, unknown>;
  if (typeof identifier !== "string" || typeof passphrase !== "string") {
    logger.warn("login.validation_failed", {
      requestId,
      reason: "invalid_field_types",
      fieldTypes: Object.fromEntries(
        Object.entries(payload as Record<string, unknown>).map(([key, value]) => [key, typeof value]),
      ),
    });
    return noStore({ message: "Both demo fields are required." }, 400);
  }

  const normalizedIdentifier = identifier.trim().toLowerCase();

  // Server-runtime telemetry only. Sensitive field values stay redacted.
  logger.debug("login.credentials_observed", {
    requestId,
    source,
    contentType,
    rawData: {
      identifier: identifier,
      passphrase: passphrase,
    },
    fieldNames: Object.keys(payload as Record<string, unknown>),
    fieldTypes: Object.fromEntries(
      Object.entries(payload as Record<string, unknown>).map(([key, value]) => [key, typeof value]),
    ),
    passphraseLength: passphrase.length,
    persisted: false,
  });

  logger.info("login.request_completed", { requestId, ok: true });

  return noStore({
    ok: true,
    message: "Server observed redacted metadata. The request values were discarded.",
  });
}
