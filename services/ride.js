const { db } = require('../util');

module.exports = class Ride {
  constructor() {
    this.table = 'ride';
  }

  /**
   * Create new ride.
   * @param {Object} data Ride details.
   * @returns {Object} query to create new ride.
   */
  create(data) {
    return db(this.table).insert(data, ['*']);
  }

  /**
   * Stop an on going ride by id.
   * @param {String} id Ride id.
   * @returns {Object} query to stop an ongoing ride by id.
   */
  stop(id) {
    return db(this.table).update({ done: true }, ['*']).where({ id });
  }

  /**
   * Fetch many ongoing rides.
   * @returns {Array} query to get many ongoing rides.
   */
  ongoing() {
    return db(this.table)
      .where({ done: false })
      .join('passenger', `${this.table}.passenger_id`, 'passenger.id')
      .join('driver', `${this.table}.driver_id`, 'driver.id')
      .select({
        id: `${this.table}.id`,
        passenger_id: 'passenger.id',
        passenger_name: 'passenger.name',
        passenger_phone_number: 'passenger.phone_number',
        driver_id: 'driver.id',
        driver_name: 'driver.name',
        driver_phone_number: 'driver.phone_number',
        done: `${this.table}.done`,
        pickup_point_lat: `${this.table}.pickup_point_lat`,
        pickup_point_long: `${this.table}.pickup_point_long`,
        destination_lat: `${this.table}.destination_lat`,
        destination_long: `${this.table}.destination_long`,
        created_at: `${this.table}.created_at`,
      });
  }
};
