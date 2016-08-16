var express = require('express');

var app = express();

// Setup routes and controllers
app.use(require('./router'));

module.exports = app;