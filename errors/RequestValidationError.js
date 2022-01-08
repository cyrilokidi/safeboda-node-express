/**
 * Create request validation error instance.
 * @param {String} message Error message.
 * @returns request validation error instance.
 */
module.exports = class RequestValidationError extends Error {
  constructor(message, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RequestValidationError);
    }

    this.name = 'RequestValidationError';
    this.code = 400;
    this.date = new Date();
    this.message = message;
  }
};
