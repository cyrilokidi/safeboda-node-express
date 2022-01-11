const Service = require('../../services/driver');
const fs = require('fs');
const data = fs.readFileSync(__dirname + '/../data.json', 'utf-8');
const { driver } = JSON.parse(data);
const { expect } = require('chai');
const { db } = require('../../util');

describe('Driver management', function () {
  describe('Create new driver', function () {
    before(function (done) {
      // Remove driver before test.

      db('driver')
        .where({ phone_number: driver.phone_number })
        .del()
        .then(() => done())
        .catch((err) => done(err));
    });

    it('Should successfully create new driver', function (done) {
      const service = new Service();

      // Create new driver
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

    after(function (done) {
      // Remove driver after test.

      db('driver')
        .where({ phone_number: driver.phone_number })
        .del()
        .then(() => done())
        .catch((err) => done(err));
    });
  });

  describe('Suspend and unsuspend driver', function () {
    let id = null;

    beforeEach(function (done) {
      // Create driver before each test
      db('driver')
        .insert({ ...driver }, ['id'])
        .then(([response]) => {
          id = response.id;

          done();
        })
        .catch((err) => done(err));
    });

    it('Should successfully suspend driver by id', function (done) {
      const service = new Service();

      // Suspend driver by id
      service
        .suspend(id)
        .then((result) => {
          expect(result).to.be.equal(1);

          done();
        })
        .catch((err) => done(err));
    });

    it('Should successfully unsuspend driver by id', function (done) {
      const service = new Service();

      // Unsuspend driver by id
      service
        .unsuspend(id)
        .then((result) => {
          expect(result).to.be.equal(1);

          done();
        })
        .catch((err) => done(err));
    });

    afterEach(function (done) {
      // Delete driver after each test.
      db('driver')
        .where({ phone_number: driver.phone_number })
        .del()
        .then(() => done())
        .catch((err) => done(err));
    });
  });
});
