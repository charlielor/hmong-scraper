var express = require('express');
var app = express();

// Set template engine
app.set('views', './app/site/views');

module.exports = app;