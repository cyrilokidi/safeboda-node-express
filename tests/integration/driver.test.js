const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');
const { expect } = chai;
const fs = require('fs');
const data = fs.readFileSync(__dirname + '/../data.json', 'utf-8');
const { driver } = JSON.parse(data);

chai.use(chaiHttp);

describe('Driver management', function () {
  let token = null;

  before(function (done) {
    chai
      .request(server)
      .post('/login')
      .send({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      })
      .then((response) => {
        token = response.body.token;

        done();
      })
      .catch((err) => done(err));
  });

  it('Should successfully create new driver', function (done) {
    chai
      .request(server)
      .post('/driver')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...driver })
      .then((response) => {
        expect(response).to.be.status(201);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('name', driver.name);
        expect(response.body).to.have.property(
          'phone_number',
          driver.phone_number
        );
        expect(response.body).to.have.property('suspended');
        expect(response.body).to.have.property('created_at');

        done();
      })
      .catch((err) => done(err));
  });
});
