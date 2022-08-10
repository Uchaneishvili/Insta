import winston from "winston";

// const getSentryDsn = () => {
//   return process.env.SENTRY_URL;
// };

// const infoOptions = {
//   sentry: {
//     dsn: getSentryDsn(),
//     tracesSampleRate: 1.0
//   },
//   level: 'info'
// };

// const errorOptions = {
//   sentry: {
//     dsn: getSentryDsn(),
//     tracesSampleRate: 1.0
//   },
//   level: 'error'
// };

export class Logger {
  private static infoLogger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
  });

  private static errorLogger = winston.createLogger({
    level: "error",
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
  });

  static error(msg: unknown, data?: unknown): void {
    this.errorLogger.error({
      timeStamp: new Date().toLocaleString(),
      message: msg,
      data,
    });
  }

  static info(msg: unknown, data?: unknown): void {
    this.infoLogger.info({
      timeStamp: new Date().toLocaleString(),
      message: msg,
      data,
    });
  }
}
