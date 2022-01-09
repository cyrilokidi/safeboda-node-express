const Service = require('../services/ride');
const { validate } = require('../middlewares');
const schema = require('../schemas/ride');

module.exports = {
  create: [
    validate(schema.create),
    async (req, res, next) => {
      try {
        const { params, body } = req;
        const service = new Service();
        const [ride] = await service.create({ ...params, ...body });

        res.status(201);
        res.json(ride);
      } catch (error) {
        next(error);
      }
    },
  ],

  stop: [
    validate(schema.stop),
    async (req, res, next) => {
      try {
        const { params } = req;
        const service = new Service();
        const [ride] = await service.stop(params.id);

        res.status(204);
        res.json(ride);
      } catch (error) {
        next(error);
      }
    },
  ],
};
