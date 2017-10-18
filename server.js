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
require('./config/passport')(passport);

//connect to our database
mongoose.connect('mongodb://localhost/Project1trendytweet');

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


//getting twitter auth 
app.get('/auth/twitter', passport.authenticate('twitter'));
// after when got auth the datas we got from twitter and redirect back to profile
 app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening to '+port);
