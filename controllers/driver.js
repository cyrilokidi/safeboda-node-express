const Service = require('../services/driver');
const validator = require('../middlewares/validator');
const schema = require('../schemas/driver');

module.exports = {
  create: [
    validator(schema.create),
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
    validator(schema.suspend),
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
    validator(schema.unsuspend),
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
