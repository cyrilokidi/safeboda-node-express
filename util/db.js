const knex = require('knex');
const logger = require('./logger');
const { NODE_ENV } = process.env;
const config = require('../knexfile');
const { QueryError, ConflictError } = require('../errors');

const db = knex({
  ...config[NODE_ENV],
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

/**
 * Handle db error.
 * @param {Object} error Error object.
 * @returns handled db error.
 */
const errorHandler = (error) => {
  let result = new QueryError(error.message);

  if (error.code === '23505') {
    const { constraint } = error;

    if (constraint === 'driver_phone_number_unique')
      result = new ConflictError('Driver phone number is already available.');

    if (constraint === 'passenger_phone_number_unique')
      result = new ConflictError(
        'Passenger phone number is already available.'
      );

    if (constraint === 'ride_passenger_id_driver_id_done_unique')
      result = new ConflictError('Ride is already available.');
  }

  return result;
};

// handle query errors
db.on('query-error', (error) => {
  throw errorHandler(error);
});

// log query responses
db.on('query-response', (response) => logger.info(JSON.stringify(response)));

module.exports = db;
