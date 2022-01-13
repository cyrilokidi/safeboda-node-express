const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const { expect } = chai;

chai.use(chaiHttp);

describe('Admin authentication', function () {
  it('Should successfully login admin', function (done) {
    chai
      .request(server)
      .post('/login')
      .send({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      })
      .then((response) => {
        expect(response).to.be.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('token').that.is.a('string');

        done();
      })
      .catch((err) => done(err));
  });

  it('Should fail to login admin with wrong credentials', function (done) {
    chai
      .request(server)
      .post('/login')
      .send({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_EMAIL,
      })
      .then((response) => {
        expect(response).to.be.status(401);

        done();
      })
      .catch((err) => done(err));
  });
});
