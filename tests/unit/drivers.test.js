const Service = require('../../services/driver');
const fs = require('fs');
const { drivers } = JSON.parse(
  fs.readFileSync(__dirname + '/../data.json', 'utf-8')
);
const { expect } = require('chai');

describe('Driver management', function () {
  it('Should successfully add first driver', function (done) {
    const service = new Service();
    const data = drivers[0];

    service
      .create(data)
      .then(([result]) => {
        expect(result).to.be.an('object');
        expect(result).to.have.property('id');
        expect(result).to.have.property('name');
        expect(result).to.have.property('phone_number');
        expect(result).to.have.property('created_at');

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
