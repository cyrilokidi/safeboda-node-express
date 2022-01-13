const { RequestValidationError } = require('../errors');

/**
 * Validate request object.
 * @param {Object} schema Request schema.
 */
module.exports = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req);

  // check if validation failed

  if (error) {
    const err = new RequestValidationError(error.message);

    next(err);
  } else {
    if (value.query) req.query = value.query;
    if (value.params) req.params = value.params;
    if (value.body) req.body = value.body;

    next();
  }
};
