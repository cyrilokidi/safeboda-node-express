const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');
const { expect } = chai;
const fs = require('fs');
const data = fs.readFileSync(__dirname + '/../data.json', 'utf-8');
const { driver } = JSON.parse(data);
const { db } = require('../../util');

chai.use(chaiHttp);

describe('Driver end-points', function () {
  let authorization;

  before(function (done) {
    chai
      .request(server)
      .post('/login')
      .send({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      })
      .then((res) => {
        authorization = `Bearer ${res.body.token}`;

        done();
      })
      .catch((err) => done(err));
  });

  afterEach(function (done) {
    db('driver')
      .where({ phone_number: driver.phone_number })
      .del()
      .then(() => done())
      .catch((err) => done(err));
  });

  it('Should successfully create new driver', function (done) {
    chai
      .request(server)
      .post('/driver')
      .set('Authorization', authorization)
      .send({ ...driver })
      .then((res) => {
        expect(res).to.be.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id').that.is.a('string');
        expect(res.body).to.have.property('name', driver.name);
        expect(res.body).to.have.property('phone_number', driver.phone_number);
        expect(res.body).to.have.property('suspended').that.is.a('boolean');
        expect(res.body).to.have.property('created_at').that.is.a('string');

        done();
      })
      .catch((err) => done(err));
  });
});
