const { validate } = require('../middlewares');
const schema = require('../schemas/auth');
const Service = require('../services/auth');

module.exports = {
  login: [
    validate(schema.login),
    async (req, res, next) => {
      try {
        const { body } = req;
        const service = new Service();
        const token = await service.login(body);

        res.status(200);
        res.json({ token });
      } catch (error) {
        next(error);
      }
    },
  ],
};
