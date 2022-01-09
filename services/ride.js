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
};
