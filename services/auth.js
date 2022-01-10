const { AuthenticationError } = require('../errors');
const { sign } = require('jsonwebtoken');

module.exports = class Auth {
  constructor() {
    this.admin = {
      email: 'okidicyril@gmail.com',
      password: 'Password123',
    };
  }

  /**
   * Login admin.
   * @param {Object} creds Admin credentials.
   * @returns {Object} signed authorization token.
   */
  login(creds) {
    const isMatch =
      creds.email === this.admin.email &&
      creds.password === this.admin.password;

    // Check if credentials are correct
    if (!isMatch) throw new AuthenticationError('Wrong email or password.');

    const payload = { email: this.admin.email }; // Token payload

    // Sign JWT token
    return sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: '1d',
    });
  }
};
