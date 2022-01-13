const Service = require('../services/ride');
const { validate } = require('../middlewares');
const schema = require('../schemas/ride');
const { NotFoundError, RequestValidationError } = require('../errors');

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

        // Check if ride is stopped
        if (!ride) throw new NotFoundError('Ride not found.');

        // Check if ride is already stopped
        if (ride.done === true)
          throw new RequestValidationError('Ride already stopped.');

        res.status(200);
        res.json(ride);
      } catch (error) {
        next(error);
      }
    },
  ],

  ongoing: [
    async (req, res, next) => {
      try {
        const service = new Service();
        const rides = await service.ongoing();

        res.status(200);
        res.json(rides);
      } catch (error) {
        next(error);
      }
    },
  ],
};
