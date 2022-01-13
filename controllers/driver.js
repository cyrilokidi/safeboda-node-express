const Service = require('../services/driver');
const { validate } = require('../middlewares');
const schema = require('../schemas/driver');
const { NotFoundError } = require('../errors');

module.exports = {
  create: [
    validate(schema.create),
    async (req, res, next) => {
      try {
        const { body } = req;
        const service = new Service();
        const [driver] = await service.create(body);

        res.status(201);
        res.json(driver);
      } catch (error) {
        next(error);
      }
    },
  ],

  suspend: [
    validate(schema.suspend),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const service = new Service();
        const suspended = await service.suspend(id);

        // Check if driver is supended
        if (suspended < 1) throw new NotFoundError('Driver not found.');

        res.status(204);
        res.end();
      } catch (error) {
        next(error);
      }
    },
  ],

  unsuspend: [
    validate(schema.unsuspend),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const service = new Service();
        const suspended = await service.unsuspend(id);

        // Check if driver is unsuspended
        if (suspended < 1) throw new NotFoundError('Driver not found.');

        res.status(204);
        res.end();
      } catch (error) {
        next(error);
      }
    },
  ],
};
