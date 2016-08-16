var express = require('express');

var app = express();

// Setup routes and controllers
app.use(require('./scraper/router'));

module.exports = app;