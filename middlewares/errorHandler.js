module.exports = (err, req, res, next) => {
  const errors = req.app.get('errors');

  if (err instanceof errors[err.name]) {
    res.status(errors[err.name].code);
    res.json(err);
  } else {
    const e = new errors.InternalServerError();

    res.status(500);
    res.json(e);
  }
};
