const Joi = require('joi');
const { object, boolean, string, number } = Joi.types();

module.exports = {
  create: object
    .keys({
      params: object.keys({
        passenger_id: string
          .guid({ version: 'uuidv4' })
          .required()
          .label('passenger id'),
        driver_id: string
          .guid({ version: 'uuidv4' })
          .required()
          .label('driver id'),
      }),
      body: object.keys({
        done: boolean.default(false).label('done'),
        pickup_point_lat: number.required().label('pickup point latitude'),
        pickup_point_long: number.required().label('pickup point longitude'),
        destination_lat: number.required().label('destination latitude'),
        destination_long: number.required().label('destination longitude'),
      }),
    })
    .unknown(),

  stop: object
    .keys({
      params: object.keys({
        id: string.guid({ version: 'uuidv4' }).required().label('id'),
      }),
    })
    .unknown(),
};
