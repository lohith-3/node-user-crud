const express = require('express');
const morgan = require('morgan');

const userRouter = require('./routes/userRoutes');

const app = express();

if (process.env.NODE_ENV.toLowerCase().trim() === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/users', userRouter);

module.exports = app;
