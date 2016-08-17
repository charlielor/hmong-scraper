var express = require('express');
var mongoose = require('mongoose');
var database = require('./app/config/database');

var app = express();

mongoose.connect(database.url);

app.use(require('./app/config/express'));

app.listen('8081');

console.log("hmong-scraper is listening on port 8081");