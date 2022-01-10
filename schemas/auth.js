const Joi = require('joi');
const { object, string } = Joi.types();

module.exports = {
  login: object
    .keys({
      body: object.keys({
        email: string.email().required().label('email'),
        password: string.required().label('password'),
      }),
    })
    .unknown(),
};
