/**
 * Create conflict error instance.
 * @param {String} message Error message.
 * @returns query error instance.
 */
module.exports = class ConflictError extends Error {
  constructor(message, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ConflictError);
    }

    this.name = 'ConflictError';
    this.code = 409;
    this.date = new Date();
    this.message = message;
  }
};
