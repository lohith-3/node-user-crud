const express = require('express');
const morgan = require('morgan');

const app = express();

if (process.env.NODE_ENV.toLowerCase().trim() === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res, next) => {
  res.send('<h1>Hello world!</h1>');
});

module.exports = app;
