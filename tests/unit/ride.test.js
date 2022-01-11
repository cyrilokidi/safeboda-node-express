const Service = require('../../services/ride');
const fs = require('fs');
const data = fs.readFileSync(__dirname + '/../data.json', 'utf-8');
const { driver, passenger, ride } = JSON.parse(data);
const { db } = require('../../util');
const { expect } = require('chai');

describe('Ride management', function () {
  describe('Create new ride', function () {
    let passengerId = null;
    let driverId = null;

    before(function (done) {
      // Create new passenger before test
      db('passenger')
        .where({ phone_number: passenger.phone_number })
        .del()
        .then(() => db('passenger').insert({ ...passenger }, ['id']))
        .then(([response]) => {
          passengerId = response.id;

          return db('driver')
            .where({ phone_number: driver.phone_number })
            .del();
        })
        .then(() => db('driver').insert({ ...driver }, ['id']))
        .then(([response]) => {
          driverId = response.id;

          done();
        })
        .catch((err) => done(err));
    });

    it('Should successfully create new ride', function (done) {
      const service = new Service();

      // Create new ride
      service
        .create({
          passenger_id: passengerId,
          driver_id: driverId,
          ...ride,
        })
        .then(([result]) => {
          expect(result).to.be.an('object');
          expect(result).to.have.property('id');
          expect(result).to.have.property('passenger_id', passengerId);
          expect(result).to.have.property('driver_id', driverId);
          expect(result).to.have.property('done');
          expect(result).to.have.property(
            'pickup_point_lat',
            ride.pickup_point_lat
          );
          expect(result).to.have.property(
            'pickup_point_long',
            ride.pickup_point_long
          );
          expect(result).to.have.property(
            'destination_lat',
            ride.destination_lat
          );
          expect(result).to.have.property(
            'destination_long',
            ride.destination_long
          );
          expect(result).to.have.property('created_at');

          done();
        })
        .catch((err) => done(err));
    });

    after(function (done) {
      // Delete passenger after test
      db('passenger')
        .where({ id: passengerId })
        .del()
        .then(() => db('driver').where({ id: driverId }).del())
        .then(() => done())
        .catch((err) => done(err));
    });
  });

  describe('Stop ongoing ride', function () {
    let passengerId = null;
    let driverId = null;
    let rideId = null;

    before(function (done) {
      db.transaction(function (trx) {
        db('passenger')
          .where({ phone_number: passenger.phone_number })
          .del()
          .transacting(trx)
          .then(() =>
            db('passenger')
              .insert({ ...passenger }, ['id'])
              .transacting(trx)
          )
          .then(([response]) => {
            passengerId = response.id;

            return db('driver')
              .where({ phone_number: driver.phone_number })
              .del()
              .transacting(trx);
          })
          .then(() =>
            db('driver')
              .insert({ ...driver }, ['id'])
              .transacting(trx)
          )
          .then(([response]) => {
            driverId = response.id;

            return db('ride')
              .where({ passenger_id: passengerId, driver_id: driverId })
              .del()
              .transacting(trx);
          })
          .then(() =>
            db('ride')
              .insert(
                { passenger_id: passengerId, driver_id: driverId, ...ride },
                ['id']
              )
              .transacting(trx)
          )
          .then(([response]) => {
            rideId = response.id;

            return;
          })
          .then(trx.commit)
          .catch(trx.rollback);
      })
        .then(() => done())
        .catch((err) => done(err));
    });

    after(function (done) {
      db.transaction(function (trx) {
        db('passenger')
          .where({ id: passengerId })
          .del()
          .transacting(trx)
          .then(() =>
            db('driver').where({ id: driverId }).del().transacting(trx)
          )
          .then(() => db('ride').where({ id: rideId }).del().transacting(trx))
          .then(trx.commit)
          .catch(trx.rollback);
      })
        .then(() => done())
        .catch((err) => done(err));
    });

    it('Should successfully stop an ongoing ride', function (done) {
      const service = new Service();

      service
        .stop(rideId)
        .then((response) => {
          expect(response).to.be.an('array').length(1);
          expect(response[0]).to.be.an('object');
          expect(response[0]).to.have.property('id');
          expect(response[0]).to.have.property('passenger_id', passengerId);
          expect(response[0]).to.have.property('driver_id', driverId);
          expect(response[0]).to.have.property('done');
          expect(response[0]).to.have.property(
            'pickup_point_lat',
            ride.pickup_point_lat
          );
          expect(response[0]).to.have.property(
            'pickup_point_long',
            ride.pickup_point_long
          );
          expect(response[0]).to.have.property(
            'destination_lat',
            ride.destination_lat
          );
          expect(response[0]).to.have.property(
            'destination_long',
            ride.destination_long
          );
          expect(response[0]).to.have.property('created_at');

          done();
        })
        .catch((err) => done(err));
    });
  });
});
