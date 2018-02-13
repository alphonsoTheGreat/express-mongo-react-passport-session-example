var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports =  mongoose.model('thumbnail', mongoose.Schema({
    x: Number,
    y: Number,
    img: String,
    userId: String
}),'thumbnail');