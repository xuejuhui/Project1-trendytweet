var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/Project1trendytweet');
module.exports.Hash = require("./hash.js");
module.exports.HashUser = require("./hashUser.js")
