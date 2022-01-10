const knex = require('knex');
const logger = require('./logger');
const { NODE_ENV } = process.env;
const config = require('../knexfile');
const { QueryError, ConflictError, RecordNotFoundError } = require('../errors');

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
 * Handle db conflict error.
 * @param {String} constraint DB error constraint.
 * @returns conflict error instance.
 */
const conflictErrorHandler = (constraint) => {
  switch (constraint) {
    case 'driver_phone_number_unique':
      return new ConflictError('Driver phone number is already available.');

    case 'passenger_phone_number_unique':
      return new ConflictError('Passenger phone number is already available.');

    case 'ride_passenger_id_driver_id_done_unique':
      return new ConflictError('Ride is already available.');

    default:
      return new ConflictError('Record is already available.');
  }
};

/**
 * Handle db record not found error.
 * @param {String} constraint DB error constraint.
 * @returns record not found error instance.
 */
const recordNotFoundErrorHandler = (constraint) => {
  switch (constraint) {
    case 'ride_passenger_id_foreign':
      return new RecordNotFoundError('Passenger not found.');

    case 'ride_driver_id_foreign':
      return new RecordNotFoundError('Driver not found.');

    default:
      return new RecordNotFoundError('Record not found.');
  }
};

/**
 * Handle db error.
 * @param {Object} error Error object.
 * @returns handled db error.
 */
const errorHandler = ({ code, constraint, message }) => {
  switch (code) {
    case '23505':
      return conflictErrorHandler(constraint);

    case '23503':
      return recordNotFoundErrorHandler(constraint);

    default:
      return new QueryError(message);
  }
};

// handle query errors
db.on('query-error', (error) => {
  throw errorHandler(error);
});

// log query responses
db.on('query-response', (response) => logger.info(JSON.stringify(response)));

module.exports = db;
