/**
 * Create route not found error instance.
 * @returns route not found error instance.
 */
module.exports = class RouteNotFoundError extends Error {
  constructor(...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RouteNotFoundError);
    }

    this.name = 'RouteNotFoundError';
    this.code = 404;
    this.date = new Date();
    this.message = 'Route not found.';
  }
};
