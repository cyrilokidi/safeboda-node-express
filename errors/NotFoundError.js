/**
 * Create not found error instance.
 * @param {String} message Error message.
 * @returns not found error instance.
 */
module.exports = class NotFoundError extends Error {
  constructor(message, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundError);
    }

    this.name = 'NotFoundError';
    this.code = 404;
    this.date = new Date();
    this.message = message;
  }
};
