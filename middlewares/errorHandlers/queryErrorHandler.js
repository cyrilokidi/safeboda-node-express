// Handle query error
module.exports = (err, req, res, next) => {
  const { QueryError } = req.app.get('errors');

  if (err instanceof QueryError) {
    res.status(406);
    res.json(err);
  } else next(err);
};
