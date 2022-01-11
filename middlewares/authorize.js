const jwt = require('jsonwebtoken');
const { RequestValidationError, AuthorizationError } = require('../errors');

/**
 * Fetch authorization token from authorization header.
 * @param {String} authorization Authorization header.
 * @returns {String} authorization token.
 */
const fetchToken = (authorization) => authorization.split(' ')[1];

/**
 * Handle JWT errors.
 * @param {Object} err Error object.
 * @returns {Object} Error object.
 */
const errorHandler = (err) =>
  jwt[err.name] ? new AuthorizationError(err.message) : err;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // Check if authorization error is passed.
  if (!authorization)
    throw new RequestValidationError('Authorization header not passed.');

  const token = fetchToken(authorization);

  // Verify authorization token.
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err) => {
    if (err) {
      next(errorHandler(err));
    } else next();
  });
};
