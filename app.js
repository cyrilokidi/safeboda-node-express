require('dotenv').config();

const express = require('express');
const cors = require('cors');
const requestLogger = require('morgan');
const { NODE_ENV } = process.env;
const errors = require('./errors');
const logger = require('./tools/logger');
const routes = require('./routes');
const errorHandlers = require('./middlewares/errorHandlers');

const requestLoggerFormat = NODE_ENV === 'development' ? 'dev' : 'combined';
const requestLoggerMiddleware = requestLogger(requestLoggerFormat);
const corsMiddleware = cors();

const app = express();
const jsonParser = express.json();
const urlEncodedParser = express.urlencoded({ extended: true });

// Use app config. middlewares
app.use(corsMiddleware);
app.use(requestLoggerMiddleware);
app.use(jsonParser);
app.use(urlEncodedParser);

// Set app errors setting
app.set('errors', errors);

// Set app logger setting
app.set('logger', logger);

// Use routes
app.use(routes);

// Use error handlers
app.use(errorHandlers.internalServerErrorHandler);
app.use(errorHandlers.routeNotFoundErrorHandler);

module.exports = app;
