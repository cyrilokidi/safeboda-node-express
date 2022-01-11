require('dotenv').config();

const { expect } = require('chai');
const Service = require('../../services/auth');
const errors = require('../../errors');

describe('Admin authentication', function () {
  it('Should successfully login admin', function () {
    const data = { email: 'okidicyril@gmail.com', password: 'Password123' };
    const service = new Service();
    const test = service.login(data);

    expect(test).to.be.a('string');
  });
});
