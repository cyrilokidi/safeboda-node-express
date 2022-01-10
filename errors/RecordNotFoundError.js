/**
 * Create record not found error instance.
 * @param {String} message Error message.
 * @returns record not found error instance.
 */
module.exports = class RecordNotFoundError extends Error {
  constructor(message, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RecordNotFoundError);
    }

    this.name = 'RecordNotFoundError';
    this.code = 404;
    this.date = new Date();
    this.message = message;
  }
};
