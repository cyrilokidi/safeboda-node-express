const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');
const { expect } = chai;

chai.use(chaiHttp).request(`/localhost:${process.env.PORT}`);

describe('Admin authentication', function () {
  it('Should successfully login admin', function (done) {
    chai
      .request(server)
      .post('/login')
      .send({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      })
      .end((err, response) => {
        expect(err).to.be.null;
        expect(response).to.be.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('token');

        done();
      });
  });

  it('Should fail to login admin with wrong credentials', function (done) {
    chai
      .request(server)
      .post('/login')
      .send({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_EMAIL,
      })
      .end((err, response) => {
        expect(err).to.be.null;
        expect(response).to.be.status(401);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('name');
        expect(response.body).to.have.property('code');
        expect(response.body).to.have.property('date');
        expect(response.body).to.have.property('message');

        done();
      });
  });
});
