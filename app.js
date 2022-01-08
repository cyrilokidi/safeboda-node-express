require('dotenv').config();

const express = require('express');
const cors = require('cors');
const requestLogger = require('morgan');
const errors = require('./errors');
const logger = require('./util/logger');
const routes = require('./routes');
const { errorHandler } = require('./middlewares');

const requestLoggerFormat =
  process.env.NODE_ENV === 'development' ? 'dev' : 'combined';
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

//Set app variables
app.set('errors', errors);
app.set('logger', logger);

// Use routes
app.use(routes);

// Use error handlers
app.use(errorHandler);

module.exports = app;
