var express = require('express');
var fs = require('fs');
var readline = require('readline');
var request = require('request');
var cheerio = require('cheerio');
var _ = require('underscore');
var app = express();

var router = new express.Router();

router.get('/', function(req, res) {
    // URL to scrape
    var url = 'http://www.pebhmong.com/forum/index.php/topic,352673.0.html';

    var scrapedURLs = [];

    var lr = readline.createInterface({
        input: fs.createReadStream('scrapedURLs.txt')
    });

    lr.on('line', function(l) {
        scrapedURLs.push(l);
    });

    // Create an Object of words and count -- An object so we can JSON.stringify and save it
    var map = fs.readFileSync('words.json', 'utf8', function(err, data) {
        if (err) {
            throw err;
        }

        return JSON.parse(data);
    }) || {};

    // Get the page and start to scrape
    request(url, function(err, res, html) {
        // If err the send err
        if (err) {
            res.send(err);
        }

        if (!(_.contains(scrapedURLs, url))) {
            // Load the HTML from URL
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

            scrapedURLs.push(url);

            fs.writeFile('words.json', JSON.stringify(map), function(err) {

            });

            fs.writeFile('scrapedURLs.txt', scrapedURLs + "\n", function(err) {

            });
        } else {
            console.log("Already parsed " + url);
        }

    });

    res.send("Scraping " + url);
});

module.exports = router;