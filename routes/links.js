var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var _ = require('underscore');
var mongoose = require('mongoose');
var logger = require('morgan');
var Link = require('./../models/link/link');
var Word = require('./../models/word/word');

var router = express.Router();

router.get('/', function(req, res) {
    Link.find({}, function(err, links) {
        if (err) {
            res.send(err);
        }

        res.json(links);
    });
});

router.post('/', function(req, res) {
    // URL to scrape
    var url = req.body.link;
    var _class = req.body['_class'];

    var re = new RegExp('\b([flsvyz]|[cdkpqrt]h?|[hm]l?|(pl)h?|(hm)l?|(hn)y?|[nx]y?|(nc)h?|(nk)h?|(np)[hl]?|(nplh)|(nq)h?|(nr)h?|(nt)[hsx]?|(ntsh)|(ntxh)|(t[sx]?h?))?(a[iuw]?|ee?|ia?|oo?|ua?|w){1}[bdgjmsv]?\b');

    // Get the page and start scraping
    request(url, function(err, res, html) {
        // If err the send err
        if (err) {
            res.send(err);
        }

        var $ = cheerio.load(html);

        // On this form, each children in each post is the message (_class)
        $('.' + _class).filter(function() {
            var message = $(this);

            console.log(message);

            $(message).find('br').replaceWith(' ');

            _.each(message.children().first().text().split(' '), function(val) {
                if (re.test(val.toLowerCase())) {
                    console.log(val);
                    // Word.find({word: val}, function(err, result) {
                    //     if (err) {
                    //         res.send(err);
                    //     }
                    //
                    //
                    //     result.addCount();
                    // });
                }

            });
        });

    });

    res.render('index', {
        numOfLinks: 10,
        numOfWords: 0
    });
});

module.exports = router;