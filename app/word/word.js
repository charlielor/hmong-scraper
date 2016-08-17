var mongoose = require('mongoose');

module.exports = mongoose.modal('word', {
    text: String,
    count: int
});