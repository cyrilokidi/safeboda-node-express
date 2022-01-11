require('dotenv').config();

const { expect } = require('chai');
const Service = require('../../services/auth');
const errors = require('../../errors');

describe('Admin authentication', function () {
  it('Should successfully login admin', function () {
    const data = {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    };
    const service = new Service();
    const test = service.login(data);

    expect(test).to.be.a('string');
  });
});
