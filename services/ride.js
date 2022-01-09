const { db } = require('../util');

module.exports = class Ride {
  constructor() {
    this.table = 'ride';
  }

  /**
   * Create new ride.
   * @param {Object} data Ride details.
   * @returns query to create new ride.
   */
  create(data) {
    return db(this.table).insert(data, ['*']);
  }

  /**
   * Stop an on going ride by id.
   * @param {String} id Ride id.
   * @returns query to stop an ongoing ride by id.
   */
  stop(id) {
    return db(this.table).update({ done: true }, ['*']).where({ id });
  }
};
