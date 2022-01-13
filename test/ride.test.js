const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const { expect } = chai;
const fs = require('fs');
const data = fs.readFileSync(__dirname + '/data.json', 'utf-8');
const { passenger, driver, ride } = JSON.parse(data);
const { db } = require('../util');

chai.use(chaiHttp);

describe('Ride management', function () {
  let authorization;
  let passengerId;
  let driverId;

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

  beforeEach(function (done) {
    db.transaction(function (trx) {
      db('passenger')
        .insert({ ...passenger }, ['id'])
        .transacting(trx)
        .then(([res]) => {
          passengerId = res.id;

          return db('driver')
            .insert({ ...driver }, ['id'])
            .transacting(trx);
        })
        .then(([res]) => {
          driverId = res.id;

          return;
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
      .then(() => done())
      .catch((err) => done(err));
  });

  afterEach(function (done) {
    db.transaction(function (trx) {
      db('passenger')
        .where({ phone_number: passenger.phone_number })
        .del()
        .transacting(trx)
        .then(() =>
          db('driver')
            .where({ phone_number: driver.phone_number })
            .del()
            .transacting(trx)
        )
        .then(trx.commit)
        .catch(trx.rollback);
    })
      .then(() => done())
      .catch((err) => done(err));
  });

  it('Should successfully create new ride', function (done) {
    chai
      .request(server)
      .post(`/ride/${passengerId}/${driverId}`)
      .set('Authorization', authorization)
      .send({ ...ride }, ['*'])
      .then((res) => {
        expect(res).to.be.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id').that.is.a('string');
        expect(res.body).to.have.property('passenger_id', passengerId);
        expect(res.body).to.have.property('driver_id', driverId);
        expect(res.body).to.have.property('done').that.is.a('boolean');
        expect(res.body).to.have.property(
          'pickup_point_lat',
          ride.pickup_point_lat
        );
        expect(res.body).to.have.property(
          'pickup_point_long',
          ride.pickup_point_long
        );
        expect(res.body).to.have.property(
          'destination_lat',
          ride.destination_lat
        );
        expect(res.body).to.have.property(
          'destination_long',
          ride.destination_long
        );
        expect(res.body).to.have.property('created_at').that.is.a('string');

        done();
      })
      .catch((err) => done(err));
  });

  it('Should reject request without authorization header', function (done) {
    chai
      .request(server)
      .post(`/ride/${passengerId}/${driverId}`)
      .send({ ...ride }, ['*'])
      .then((res) => {
        expect(res).to.be.status(400);

        done();
      })
      .catch((err) => done(err));
  });
});
