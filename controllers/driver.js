const Service = require('../services/driver');

module.exports = {
  create: [
    async (req, res, next) => {
      try {
        const { body } = req;
        const service = new Service();
        const driver = await service.create(body);

        res.status(201);
        res.json(driver);
      } catch (error) {
        next(error);
      }
    },
  ],
};
