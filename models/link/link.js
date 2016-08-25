var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var linkSchema = new Schema({
    "url": {
        type: String,
        required: true,
        unique: true
    },
    "dateParsed": {
        type: Date,
        required: true
    }
});

linkSchema.pre('save', function(next) {
    this.dateParsed = new Date();
    next();
});

var Link = mongoose.model("Link", linkSchema);

module.exports = Link;