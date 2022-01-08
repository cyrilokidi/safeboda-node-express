/**
 * Create query error instance.
 * @param {String} message Error message.
 * @returns query error instance.
 */
module.exports = class QueryError extends Error {
  constructor(message, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, QueryError);
    }

    this.name = 'QueryError';
    this.date = new Date();
    this.message = message;
  }
};
