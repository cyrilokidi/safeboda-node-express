const Joi = require('joi');
const { object, string } = Joi.types();

module.exports = {
  create: object
    .keys({
      body: object.keys({
        name: string.required().label('name'),
        phone_number: string.required().label('phone_number'),
      }),
    })
    .unknown(),

  suspend: object
    .keys({
      params: object.keys({
        id: string.guid({ version: 'uuidv4' }).required().label('id'),
      }),
    })
    .unknown(),

  unsuspend: object
    .keys({
      params: object.keys({
        id: string.guid({ version: 'uuidv4' }).required().label('id'),
      }),
    })
    .unknown(),
};
