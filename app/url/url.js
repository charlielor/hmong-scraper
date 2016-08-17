var mongoose = require('mongoose');

module.exports = mongoose.modal('url', {
    text: String,
    dateParsed: DateTime
});