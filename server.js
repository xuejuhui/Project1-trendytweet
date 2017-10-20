// set all the var we need everything are from lecture
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var Twit = require('twit')
require('./config/passport')(passport);
app.use(express.static(__dirname + '/public'));

//connect to our database
// mongoose.connect('mongodb://localhost/Project1trendytweet');
var db = require('./app/models');
// use all the var we set in our express
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.set('view engine', 'ejs');
app.use(session({secret: 'thisissogood'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// route to our index our homepage, I used the index.ejs
app.get('/', function(req, res){
  res.render('index.ejs');
});
//route to login
app.get('/login', function(req, res){
  res.render('login.ejs', {message: req.flash('loginMessage')});

});
//route to signup
app.get('/signup', function(req, res){
  res.render('signup.ejs', {message: req.flash('signupMessage')});
});
    // when user is signing up and here we use local signup we defined in passport.js
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash : true
    }));

 // when user is login and here we use local login we defined in passport.js
app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login',
        failureFlash : true
    }));
// when user login route to profile page
app.get('/profile', isLoggedIn, function(req, res){
  res.render('profile.ejs', {
    user: req.user
  });
});
//function making sure user is logged in
function isLoggedIn(req, res, next){
  if(req.isAuthenticated())
    return next();
  res.redirect('/')
}
//route logout return to home page index.ejs
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
app.get('/portal', function(req, res){
  res.sendFile('public/html/portal.html' , { root : __dirname});
});


//getting twitter auth
app.get('/auth/twitter', passport.authenticate('twitter'));
// after when got auth the datas we got from twitter and redirect back to profile
 app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

 app.get('/api/hashs', function (req, res) {
  // send all books as JSON response
  db.Hash.find(function(err, hashs){
    if (err) { return console.log("index error: " + err); }
    console.log(hashs);
    res.json(hashs);
  });
});

 app.post('/api/hashs', function (req, res) {

   var newHash = new db.Hash({
      hash: req.body.search

    });

         newHash.save(function(err, hash){
        if (err) {
          return console.log("create error: " + err);
        }
        console.log("created ", hash.hash);
        res.json(hash);
      });

  });

// Searching Hashes

      var T = new Twit({
        consumer_key:         'OUjwUJqiRoqpG0gTlZcgA1mv2',
        consumer_secret:      'prILcGZOQL9bRBrnk41tD1IdE4ZTNkGuYTfvtngvRtXk9rua1H',
        access_token:         '3068070909-G5BjVgXzjIsJZG8P96NqYAx106JjthMWV9PmJ0w',
        access_token_secret:  'IEjMg4hA5YDelbBoU5hvmV0dDz7DgyZiJXSXNmzuZEADY',
        timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
      })

  //Note that Application-only auth will not allow you to perform requests to
  //API endpoints requiring a user context, such as posting tweets.
  T.post('statuses/update', { status: 'Testing123!' }, function(err, data, response) {
    console.log(data)
  })

//  filter the twitter public stream for specific hashtag
//T.stream(path, [params]) keeps the connection alive, and returns an EventEmitter.

      var stream = T.stream('statuses/filter', { track: '#hello', language: 'en' })

      stream.on('tweet', function (tweet) {
        console.log(tweet)
      })

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening to '+port);
