/**
 * Handle route not found error.
 * @returns route not found error object.
 */
module.exports = (req, res, next) => {
  const errors = req.app.get('errors');
  const err = new errors.RouteNotFoundError();

  res.status(404);
  res.json(err);
};
