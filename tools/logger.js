const { createLogger, format, transports } = require('winston');
const path = require('path');
const { ROOT_PATH, NODE_ENV } = process.env;

const logPath = `${ROOT_PATH}/logs`;

const formatOptions = format.combine(
  format.timestamp({ format: 'YYYY-MM--DD HH:mm:ss' }),
  format.printf((log) => `${log.timestamp} :: ${log.message}`)
);

const logger = createLogger({
  level: 'info',
  format: formatOptions,
  defaultMeta: { service: 'api-service' },
  transports: [
    new transports.File({
      filename: path.join(logPath, '/error.log'),
      level: 'error',
    }),
    new transports.File({ filename: path.join(logPath, '/combined.log') }),
  ],
});

const productionFormatOptions = format.combine(
  format.colorize(),
  format.simple()
);

// print logs in console if environment is in production

if (NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: productionFormatOptions,
    })
  );
}

module.exports = logger;
