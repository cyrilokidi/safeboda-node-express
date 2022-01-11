/**
 * Create authorization error instance.
 * @param {String} message Error message.
 * @returns {Object} authorization error instance.
 */
module.exports = class AuthorizationError extends Error {
  constructor(message, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthorizationError);
    }

    this.name = 'AuthorizationError';
    this.code = 403;
    this.date = new Date();
    this.message = message;
  }
};
