var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

var router = new express.Router();

router.get('/', function(req, res) {
    var url = 'http://www.pebhmong.com/forum/index.php/topic,352673.0.html';

    request(url, function(err, res, html) {
        if (err) {
            res.send(err);
        }

        var $ = cheerio.load(html);

        var count = {
            "word": "",
            "count": 0
        };

        $('.inner').filter(function() {
            var content = $(this);

            console.log(content.text());
        })
    });

    res.send("Scraping " + url);
});

module.exports = router;