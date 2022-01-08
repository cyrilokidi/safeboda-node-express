const db = require('../util/db');

module.exports = class Driver {
  constructor() {
    this.table = 'driver';
  }

  /**
   * Create new driver.
   * @param {Object} data Driver details.
   * @returns query to create new driver.
   */
  create(data) {
    return db(this.table).insert(data, ['*']);
  }

  /**
   * Suspend driver by id.
   * @param {String} id Driver id.
   * @returns query to suspend driver by id.
   */
  suspend(id) {
    return db(this.table).update({ suspended: true }).where({ id });
  }

  /**
   * Unsuspend driver by id.
   * @param {String} id Driver id.
   * @returns query to unsuspend driver id.
   */
  unsuspend(id) {
    return db(this.table).update({ suspended: false }).where({ id });
  }
};
