//require mongoose and connect to database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/work_bettah)');

var Tweets = require('./tweets');
var User = require('./user');
var Searches = require('./searches');

module.exports ={
  Tweets: tweets,
  User: User,
  Searches: Searches
};
