const Service = require('../services/passenger');
const { validate } = require('../middlewares');
const schema = require('../schemas/passenger');

module.exports = {
  create: [
    validate(schema.create),
    async (req, res, next) => {
      try {
        const { body } = req;
        const service = new Service();
        const [passenger] = await service.create(body);

        res.status(201);
        res.json(passenger);
      } catch (error) {
        next(error);
      }
    },
  ],
};
