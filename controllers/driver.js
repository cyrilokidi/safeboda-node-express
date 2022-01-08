const Service = require('../services/driver');
const { validate } = require('../middlewares');
const schema = require('../schemas/driver');

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
        await service.suspend(id);

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
        await service.unsuspend(id);

        res.status(204);
        res.end();
      } catch (error) {
        next(error);
      }
    },
  ],
};
