const internalServerErrorHandler = require('./internalServerErrorHandler');
const routeNotFoundErrorHandler = require('./routeNotFoundErrorHandler');
const queryErrorHandler = require('./queryErrorHandler');

module.exports = {
  internalServerErrorHandler,
  routeNotFoundErrorHandler,
  queryErrorHandler,
};
