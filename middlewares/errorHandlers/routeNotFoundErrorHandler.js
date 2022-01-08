// Handle route not found error
module.exports = (req, res, next) => {
  const { RouteNotFoundError } = req.app.get('errors');
  const err = new RouteNotFoundError();

  res.status(404);
  res.json(err);
};
