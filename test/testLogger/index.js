const winston = require("winston");

const { createLogger, format, transports } = winston;
const { combine, timestamp, printf } = format;

const errorLogPath = `${__dirname}/logs/error.log`;
const combinedLogPath = `${__dirname}/logs/combined.log`;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [TraceID: ------] ${level}: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(timestamp(), myFormat),
  transports: [
    new transports.File({ filename: errorLogPath, level: "error" }),
    new transports.File({ filename: combinedLogPath })
  ]
});

logger.debug = (...params) => logger.log("debug", ...params);

module.exports = logger;
