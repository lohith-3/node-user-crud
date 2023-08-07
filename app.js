const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
  res.send('<h1>Hello world!</h1>');
});

module.exports = app;
