type LogLevel = "debug" | "info" | "warn" | "error";
type LogContext = Record<string, unknown>;

function write(level: LogLevel, action: string, context: LogContext = {}) {
  const entry = {
    service: "auth-signal-lab",
    level,
    action,
    at: new Date().toISOString(),
    ...context,
  };

  console[level](JSON.stringify(entry));
}

export const logger = {
  debug: (action: string, context?: LogContext) => write("debug", action, context),
  info: (action: string, context?: LogContext) => write("info", action, context),
  warn: (action: string, context?: LogContext) => write("warn", action, context),
  error: (action: string, context?: LogContext) => write("error", action, context),
};
