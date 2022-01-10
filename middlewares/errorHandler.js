// Handle custom error.
const customErrorHandler = (err, req, res, next) => {
  const errors = req.app.get('errors');

  if (errors[err.name] && err instanceof errors[err.name]) {
    res.status(err.code);
    res.json(err);
  } else next(err);
};

// Handle internal server error
const internalServerErrorHandler = (err, req, res, next) => {
  const { InternalServerError } = req.app.get('errors');
  const logger = req.app.get('logger');

  // log error
  logger.error(err.stack);

  const error = new InternalServerError();

  res.status(error.code);
  res.json(error);
};

// Handle route not found error.
const routeNotFoundErrorHandler = (req, res, next) => {
  const { RouteNotFoundError } = req.app.get('errors');
  const error = new RouteNotFoundError();

  res.status(error.code);
  res.json(error);
};

module.exports = [
  customErrorHandler,
  internalServerErrorHandler,
  routeNotFoundErrorHandler,
];
