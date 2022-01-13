/**
 * Create authentication error instance.
 * @param {String} message Error message.
 * @returns {Object} authentication error instance.
 */
module.exports = class AuthenticationError extends Error {
  constructor(message, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthenticationError);
    }

    this.name = 'AuthenticationError';
    this.code = 401;
    this.date = new Date();
    this.message = message;
  }
};
