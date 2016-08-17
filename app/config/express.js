var express = require('express');
var app = express();

// Set template engine
app.set('views', './app');
app.set('view engine', 'jade');

// Setup routes and controllers
app.use(require('./../router'));

module.exports = app;