var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var _ = require('underscore');
var mongoose = require('mongoose');
var logger = require('morgan');
var Link = require('./../models/link/link');
// var Word = require('./../models/word/word');

var router = express.Router();


router.get('/links', function(req, res) {
    Link.find({}, function(err, links) {
        if (err) {
            res.send(err);
        }

        res.json(links);
    })
});

router.post('/links', function(req, res) {
    // URL to scrape
    var url = req.param.link;
    var _class = req.param['_class'];

    logger.log(url + ' ' + _class);

    // Create an Object of words and count -- An object so we can JSON.stringify and save it
    var map = {};

    // Get the page and start to scrape
    // request(url, function(err, res, html) {
    //     // If err the send err
    //     if (err) {
    //         res.send(err);
    //     }
    //
    //     var $ = cheerio.load(html);
    //
    //     // On this form, each children in each post is the message (.inner)
    //     $('.post').filter(function() {
    //         var post = $(this);
    //
    //         $(post).find('br').replaceWith(' ');
    //
    //         _.each(post.children().first().text().split(' '), function(val) {
    //             if (map.hasOwnProperty(val)) {
    //                 map[val] = map[val] + 1;
    //             } else {
    //                 map[val] = 1;
    //             }
    //
    //         });
    //     });
    //
    // });

    res.render('index', {
        numOfLinks: 10,
        numOfWords: 0
    });
});

module.exports = router;