const { RequestValidationError } = require('../errors');

/**
 * Validate request object.
 * @param {Object} schema Request schema.
 */
module.exports = (schema) => (req, res, next) => {
  const { error } = schema.validate(req);

  // check if validation failed

  if (error) {
    const err = new RequestValidationError(error.message);

    next(err);
  } else next();
};
