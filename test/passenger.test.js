const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const { expect } = chai;
const fs = require('fs');
const data = fs.readFileSync(__dirname + '/data.json', 'utf-8');
const { passenger } = JSON.parse(data);
const { db } = require('../util');

chai.use(chaiHttp);

describe('Passenger management', function () {
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
    db('passenger')
      .where({ phone_number: passenger.phone_number })
      .del()
      .then(() => done())
      .catch((err) => done(err));
  });

  it('Should successfully create new passenger', function (done) {
    chai
      .request(server)
      .post('/passenger')
      .set('Authorization', authorization)
      .send({ ...passenger })
      .then((res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id').that.is.a('string');
        expect(res.body).to.have.property('name', passenger.name);
        expect(res.body).to.have.property(
          'phone_number',
          passenger.phone_number
        );
        expect(res.body).to.have.property('created_at').that.is.a('string');

        done();
      })
      .catch((err) => done(err));
  });

  it('Should reject request without authorization header', function (done) {
    chai
      .request(server)
      .post('/passenger')
      .send({ ...passenger })
      .then((res) => {
        expect(res).to.have.status(400);

        done();
      })
      .catch((err) => done(err));
  });

  describe('Create existing passenger', function () {
    before(function (done) {
      db('passenger')
        .insert({ ...passenger })
        .then(() => done())
        .catch((err) => done(err));
    });

    it('Should fail to create existing passenger', function (done) {
      chai
        .request(server)
        .post('/passenger')
        .set('Authorization', authorization)
        .send({ ...passenger })
        .then((res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('name').that.is.a('string');
          expect(res.body).to.have.property('code').that.is.a('number');
          expect(res.body).to.have.property('date').that.is.a('string');
          expect(res.body).to.have.property('message').that.is.a('string');

          done();
        })
        .catch((err) => done(err));
    });
  });
});
