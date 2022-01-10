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

  ongoing: object
    .keys({
      query: object.keys({
        search: string.label('search'),
        page_number: number.min(1).default(1).label('page number'),
        page_limit: number.default(1).label('page limit'),
        sort_field: string
          .valid(
            'passenger_name',
            'passenger_phone_number',
            'driver_name',
            'driver_phone_number',
            'created_at'
          )
          .default('created_at')
          .custom((value) => {
            switch (value) {
              case 'passenger_name':
                return 'passenger.name';

              case 'passenger_phone_number':
                return 'passenger.phone_number';

              case 'driver_name':
                return 'driver.name';

              case 'driver_phone_number':
                return 'driver.phone_number';

              default:
                return 'ride.created_at';
            }
          })
          .label('sort field'),
        sort_order: string
          .valid('asc', 'desc')
          .default('desc')
          .label('sort order'),
      }),
    })
    .unknown(),
};
