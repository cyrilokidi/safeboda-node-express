const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const { expect } = chai;
const fs = require('fs');
const data = fs.readFileSync(__dirname + '/data.json', 'utf-8');
const { driver } = JSON.parse(data);
const { db } = require('../util');

chai.use(chaiHttp);

describe('Driver management', function () {
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

  it('Should reject request without authorization header', function (done) {
    chai
      .request(server)
      .post('/driver')
      .send({ ...driver })
      .then((res) => {
        expect(res).to.be.status(400);

        done();
      })
      .catch((err) => done(err));
  });

  describe('Create existing driver', function () {
    before(function (done) {
      db('driver')
        .insert({ ...driver })
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

          done();
        })
        .catch((err) => done(err));
    });
  });

  describe('Suspend/Unsuspend driver', function () {
    let id;

    beforeEach(function (done) {
      chai
        .request(server)
        .post('/driver')
        .set('Authorization', authorization)
        .send({ ...driver })
        .then((res) => {
          id = res.body.id;

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

    it('Should successfully suspend driver', function (done) {
      chai
        .request(server)
        .post(`/driver/${id}/suspend`)
        .set('Authorization', authorization)
        .then((res) => {
          expect(res).to.be.status(204);

          done();
        })
        .catch((err) => done(err));
    });

    it('Should fail to suspend inexistent driver', function (done) {
      chai
        .request(server)
        .post(`/driver/02e5f60e-50b0-4c12-aa0b-0c271589aa53/suspend`)
        .set('Authorization', authorization)
        .then((res) => {
          expect(res).to.be.status(404);

          done();
        })
        .catch((err) => done(err));
    });

    it('Should reject request without authorization header', function (done) {
      chai
        .request(server)
        .post(`/driver/${id}/suspend`)
        .then((res) => {
          expect(res).to.be.status(400);

          done();
        })
        .catch((err) => done(err));
    });

    it('Should successfully unsuspend driver', function (done) {
      chai
        .request(server)
        .delete(`/driver/${id}/suspend`)
        .set('Authorization', authorization)
        .then((res) => {
          expect(res).to.be.status(204);

          done();
        })
        .catch((err) => done(err));
    });

    it('Should fail to unsuspend inexistent driver', function (done) {
      chai
        .request(server)
        .delete(`/driver/02e5f60e-50b0-4c12-aa0b-0c271589aa53/suspend`)
        .set('Authorization', authorization)
        .then((res) => {
          expect(res).to.be.status(404);

          done();
        })
        .catch((err) => done(err));
    });

    it('Should reject request without authorization header', function (done) {
      chai
        .request(server)
        .delete(`/driver/${id}/suspend`)
        .then((res) => {
          expect(res).to.be.status(400);

          done();
        })
        .catch((err) => done(err));
    });
  });
});
