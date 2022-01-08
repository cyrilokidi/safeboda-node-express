const knex = require('knex');
const logger = require('./logger');
const { NODE_ENV } = process.env;
const config = require('../knexfile')[NODE_ENV];
const { QueryError } = require('../errors');

const db = knex({
  ...config,
  asyncStackTraces: NODE_ENV === 'development',
  log: {
    // log error events
    error(msg) {
      logger.error(msg);
    },

    // log warning events
    warn(msg) {
      logger.warn(msg);
    },

    // log deprecation devents
    deprecate(msg) {
      logger.warn(msg);
    },

    // log debug events
    debug(msg) {
      logger.debug(msg);
    },
  },
});

// log query events
db.on('query', (data) => logger.info(JSON.stringify(data)));

const errorHandler = (error) => {
  let result = new QueryError(error.message);

  return result;
};

// handle query errors
db.on('query-error', (error) => {
  throw errorHandler(error);
});

// log query responses
db.on('query-response', (response) => logger.info(JSON.stringify(response)));

module.exports = db;
