const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');
const { expect } = chai;
const fs = require('fs');
const data = fs.readFileSync(__dirname + '/../data.json', 'utf-8');
const { driver } = JSON.parse(data);
const { db } = require('../../util');

chai.use(chaiHttp);

describe('Driver management', function () {
  let authorization = null;

  before(function (done) {
    chai
      .request(server)
      .post('/login')
      .send({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      })
      .then((response) => {
        authorization = `Bearer ${response.body.token}`;

        done();
      })
      .catch((err) => done(err));
  });

  describe('Create new driver', function () {
    let id = null;

    after(function (done) {
      db('driver')
        .where({ id })
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
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('name', driver.name);
          expect(res.body).to.have.property(
            'phone_number',
            driver.phone_number
          );
          expect(res.body).to.have.property('suspended');
          expect(res.body).to.have.property('created_at');

          id = res.body.id; // for deleting driver after test

          done();
        })
        .catch((err) => done(err));
    });
  });

  describe('Create existing driver', function () {
    let id = null;

    before(function (done) {
      db('driver')
        .insert({ ...driver }, ['id'])
        .then(([res]) => {
          id = res.id; // for deleting driver after test

          done();
        })
        .catch((err) => done(err));
    });

    after(function (done) {
      db('driver')
        .where({ id })
        .del()
        .then(() => done())
        .catch((err) => done(err));
    });

    it('Should fail to create existing driver', function (done) {
      chai
        .request(server)
        .post('/driver')
        .set('Authorization', authorization)
        .send({ ...driver })
        .then((res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('code');
          expect(res.body).to.have.property('date');
          expect(res.body).to.have.property('message');

          done();
        })
        .catch((err) => done(err));
    });
  });
});
