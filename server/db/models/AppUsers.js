var mongoose = require('mongoose');

module.exports =  mongoose.model('AppUsers',  mongoose.Schema({
    firstName: String,
    lastName: String,
    password: String,
    email: String,
    id: String
}),'AppUsers');