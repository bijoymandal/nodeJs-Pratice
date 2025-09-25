import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: "request-logging" },
  transports: [
    new winston.transports.File({ filename: "logs.txt" }),
  ],
});

const loggerMiddleware = (req, res, next) => {
  try {
    if (!req.url.includes("signin")) {
      const logData = {
        url: req.originalUrl,
        method: req.method,
        body: req.body,
      };
      logger.info(logData);
    }
  } catch (err) {
    console.error("Logging error:", err);
    // ❌ Do NOT send res here
  }

  next(); // ✅ always call next, but do NOT send response
};

export default loggerMiddleware;
