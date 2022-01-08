/**
 * Handle internal server error.
 * @returns internal server error object.
 */
module.exports = (err, req, res, next) => {
  const errors = req.app.get('errors');
  const logger = req.app.get('logger');

  // log error

  logger.error(err.stack);

  const e = new errors.InternalServerError();

  res.status(500);
  res.json(e);
};
