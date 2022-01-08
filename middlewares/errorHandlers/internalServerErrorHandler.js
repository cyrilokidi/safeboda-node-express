// Handle internal server error
module.exports = (err, req, res, next) => {
  const { InternalServerError } = req.app.get('errors');
  const logger = req.app.get('logger');

  // log error

  logger.error(err.stack);

  const e = new InternalServerError();

  res.status(500);
  res.json(e);
};
