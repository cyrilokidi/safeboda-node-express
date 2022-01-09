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
   * Calculate pagination offset.
   * @param {Number} page_number Page number.
   * @param {Number} page_limit Page limit.
   * @returns {Number} pagination offset.
   */
  calcOffset(page_number, page_limit) {
    return page_number * page_limit - page_limit;
  }

  prepareSortField(field) {
    switch (field) {
      case 'passenger_name':
        return 'passenger.name';

      case 'passenger_phone_number':
        return 'passenger.phone_number';

      case 'driver_name':
        return 'driver.name';

      case 'driver_phone_number':
        return 'driver.phone_number';

      default:
        return `${this.table}.created_at`;
    }
  }

  /**
   * Fetch many ongoing rides.
   * @param {Object} options Query pagination options.
   * @returns {Array} query to get many ongoing rides.
   */
  ongoing(options) {
    const { search, page_number, page_limit, sort_field, sort_order } = options;
    const offset = this.calcOffset(page_number, page_limit);
    const sortField = this.prepareSortField(sort_field);
    let query = () =>
      db(this.table)
        .where({ done: false })
        .join('passenger', `${this.table}.passenger_id`, 'passenger.id')
        .join('driver', `${this.table}.driver_id`, 'driver.id');

    if (search)
      query = () =>
        db(this.table)
          .where({ done: false })
          .andWhere((b) => {
            b.where('passenger.name', 'ILIKE', `%${search}%`);
            b.orWhere('passenger.phone_number', 'ILIKE', `%${search}%`);
            b.orWhere('driver.name', 'ILIKE', `%${search}%`);
            b.orWhere('driver.phone_number', 'ILIKE', `%${search}%`);
          })
          .join('passenger', `${this.table}.passenger_id`, 'passenger.id')
          .join('driver', `${this.table}.driver_id`, 'driver.id');

    return Promise.all([
      query()
        .offset(offset)
        .select({
          id: `${this.table}.id`,
          created_at: `${this.table}.created_at`,
        })
        .limit(page_limit)
        .orderBy(sortField, sort_order),
      query().count(),
    ]);
  }
};
