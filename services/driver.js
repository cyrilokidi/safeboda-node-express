const db = require('../util/db');

module.exports = class Driver {
  /**
   * Create new driver.
   * @param {Object} data Driver details.
   * @returns query to create new driver.
   */
  create(data) {
    return db('driver').insert(data, ['*']);
  }
};
