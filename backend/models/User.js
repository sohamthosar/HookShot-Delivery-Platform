var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    passwordHash : String,
    refreshTokenVersion : {
        type : Number,
        default : 0,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('User', userSchema);