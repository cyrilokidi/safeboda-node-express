const { db } = require('../util');

module.exports = class Passenger {
  constructor() {
    this.table = 'passenger';
  }

  /**
   * Create new passenger.
   * @param {Object} data Passenger details.
   * @returns query to create new passenger.
   */
  create(data) {
    return db(this.table).insert(data, ['*']);
  }
};
