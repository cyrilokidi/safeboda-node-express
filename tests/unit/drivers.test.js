const Service = require('../../services/driver');
const fs = require('fs');
const data = fs.readFileSync(__dirname + '/../data.json', 'utf-8');
const { driver } = JSON.parse(data);
const { expect } = require('chai');
const { db } = require('../../util');

describe('Driver management', function () {
  before(function (done) {
    // Remove driver before test.

    db('driver')
      .where({ phone_number: driver.phone_number })
      .del()
      .then(() => done())
      .catch((err) => done(err));
  });

  it('Should successfully create driver', function (done) {
    const service = new Service();

    // Create driver
    service
      .create({ ...driver })
      .then(([result]) => {
        expect(result).to.be.an('object');
        expect(result).to.have.property('id');
        expect(result).to.have.property('name', driver.name);
        expect(result).to.have.property('phone_number', driver.phone_number);
        expect(result).to.have.property('created_at');

        done();
      })
      .catch((err) => done(err));
  });
});
