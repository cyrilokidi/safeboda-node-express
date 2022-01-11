const Service = require('../../services/passenger');
const fs = require('fs');
const data = fs.readFileSync(__dirname + '/../data.json', 'utf-8');
const { passenger } = JSON.parse(data);
const { expect } = require('chai');
const { db } = require('../../util');

describe('Passenger management', function () {
  before(function (done) {
    // Remove passenger before test

    db('passenger')
      .where({ phone_number: passenger.phone_number })
      .del()
      .then(() => done())
      .catch((err) => done(err));
  });

  it('Should successfully create new passenger', function (done) {
    const service = new Service();

    // Create new passenger
    service
      .create({ ...passenger })
      .then(([result]) => {
        expect(result).to.be.an('object');
        expect(result).to.have.property('id');
        expect(result).to.have.property('name', passenger.name);
        expect(result).to.have.property('phone_number', passenger.phone_number);
        expect(result).to.have.property('created_at');

        done();
      })
      .catch((err) => done(err));
  });
});
