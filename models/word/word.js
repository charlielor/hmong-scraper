var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wordSchema = new Schema({
    "word": {
        type: String,
        required: true,
        unique: true
    },
    "count": {
        type: Number,
        required: true
    },
    "definition": {
        type: String
    },
    "englishTranslation": {
        type: String
    },
    "hmonglish": {
        type: Array
    }
});

wordSchema.methods.addCount = function() {
    this.count++;
};

wordSchema.methods.minusCount = function() {
    this.count--;
};

wordSchema.methods.addHmonglish = function(word) {
    this.hmonglish.push(word);
};

var Word = mongoose.model("Word", wordSchema);

module.exports = Word;