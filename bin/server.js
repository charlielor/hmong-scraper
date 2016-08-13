var express = require('express');
var fs = require('fs');
var request = require('request');
var cherrio = require('cheerio');
var app = express();

app.listen('8081');

console.log("hmong-scraper is listening on port 8081");

exports = module.exports = app;

