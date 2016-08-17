var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var _ = require('underscore');
var mongoose = require('mongoose');
var router = express.Router();

router.route('/')
    .get(function(req, res) {
        res.render('./url/views/index');
    })
    .post(function(req, res) {
        // URL to scrape
        var url = 'http://www.pebhmong.com/forum/index.php/topic,352673.0.html';
        var _class = "";

        // Create an Object of words and count -- An object so we can JSON.stringify and save it
        var map = {};

        // Get the page and start to scrape
        request(url, function(err, res, html) {
            // If err the send err
            if (err) {
                res.send(err);
            }

            var $ = cheerio.load(html);

            // On this form, each children in each post is the message (.inner)
            $('.post').filter(function() {
                var post = $(this);

                $(post).find('br').replaceWith(' ');

                _.each(post.children().first().text().split(' '), function(val) {
                    if (map.hasOwnProperty(val)) {
                        map[val] = map[val] + 1;
                    } else {
                        map[val] = 1;
                    }

                });
            });

        });

        res.send("Scraping " + url);
    });

module.exports = router;