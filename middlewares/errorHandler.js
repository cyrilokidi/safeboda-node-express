module.exports = [
  // Generic error handler
  (err, req, res, next) => {
    const errors = req.app.get('errors');

    if (errors[err.name] && err instanceof errors[err.name]) {
      res.status(err.code);
      res.json(err);
    } else {
      const e = new errors.InternalServerError();

      res.status(e.code);
      res.json(e);
    }
  },

  // Route not found error handler
  (req, res, next) => {
    const { RouteNotFoundError } = req.app.get('errors');
    const e = new RouteNotFoundError();

    res.status(e.code);
    res.json(e);
  },
];
