var express = require('express');
var app = express();

var scrape = require('./url/url-scrape');

app.use('/scrape', scrape);

module.exports = app;