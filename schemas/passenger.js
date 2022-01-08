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
};
