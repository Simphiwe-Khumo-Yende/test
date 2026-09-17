"use client";

import { FormEvent, useState } from "react";

type DemoState = "idle" | "sending" | "success" | "error";

export default function AuthDemo() {
  const [identifier, setIdentifier] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [state, setState] = useState<DemoState>("idle");
  const [message, setMessage] = useState("Enter local test credentials to inspect the request.");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setMessage("Sending one ephemeral request…");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        credentials: "omit",
        body: JSON.stringify({ identifier, passphrase }),
      });
      const data = (await response.json()) as { message?: string };
      setPassphrase("");

      if (!response.ok) {
        setState("error");
        setMessage(data.message ?? "The simulation could not be completed.");
        return;
      }

      setState("success");
      setMessage(data.message ?? "Request observed and discarded.");
    } catch {
      setPassphrase("");
      setState("error");
      setMessage("The server could not be reached. Try again when the demo is online.");
    }
  }

  return (
    <div className="demoCard">
      <div className="cardTopline">
        <span>LIVE CHAT</span>
        <span className="privacyDot">LOCAL SESSION</span>
      </div>
      <div className="cardHeading">
        <div className="lock" aria-hidden="true"><span /></div>
        <div><h2>Join the conversation</h2><p>Open your local chat preview</p></div>
      </div>

      <div className="warningBox">
        <strong>Local preview.</strong> Use test details to explore this messaging interface.
      </div>

      <form onSubmit={submit}>
        <label htmlFor="identifier">Username or email</label>
        <div className="inputWrap">
          <span aria-hidden="true">@</span>
          <input
            id="identifier"
            type="text"
            autoComplete="off"
            spellCheck="false"
            placeholder="Choose your chat identity"
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            required
          />
        </div>

        <label htmlFor="passphrase">Access key</label>
        <div className="inputWrap">
          <span aria-hidden="true">✦</span>
          <input
            id="passphrase"
            type="password"
            autoComplete="new-password"
            placeholder="Enter your test access key"
            value={passphrase}
            onChange={(event) => setPassphrase(event.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={state === "sending"}>
          <span>{state === "sending" ? "Observing request…" : "Run simulation"}</span>
          <span aria-hidden="true">→</span>
        </button>
      </form>

      <div className={`status ${state}`} role="status" aria-live="polite">
        <span aria-hidden="true">{state === "success" ? "✓" : state === "error" ? "!" : "i"}</span>
        <p>{message}</p>
      </div>
    </div>
  );
}
