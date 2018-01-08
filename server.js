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
require('./config/config.js');
app.use(express.static(__dirname + '/public'));


//connect to our database
// mongoose.connect('mongodb://localhost/Project1trendytweet');
var db = require('./app/models');
// use all the var we set in our express
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.set('view engine', 'ejs');
app.use(session({
    secret: 'thisissogood'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// route to our index our homepage, I used the index.ejs 
app.get('/', function(req, res) {
    res.render('index.ejs');
});
//route to login
app.get('/login', function(req, res) {
    res.render('login.ejs', {
        message: req.flash('loginMessage')
    });

});
//route to signup
app.get('/signup', function(req, res) {
    res.render('signup.ejs', {
        message: req.flash('signupMessage')
    });
});
// when user is signing up and here we use local signup we defined in passport.js
app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

// when user is login and here we use local login we defined in passport.js
app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));
// when user login route to profile page
app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
        user: req.user
    });
});
//function making sure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/')
}
//route logout return to home page index.ejs
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});
app.get('/portal', function(req, res) {
    // console.log(pass.tokenSecretG)
    res.sendFile('public/html/portal.html', {
        root: __dirname
    });

});

//getting twitter auth 
app.get('/auth/twitter', passport.authenticate('twitter'));
// after when got auth the datas we got from twitter and redirect back to profile
app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

app.get('/api/hashs', function(req, res) {
    // send all books as JSON response

    db.Hash.find({
        userId: req.user._id
    }, function(err, hashs) {
        if (err) {
            return console.log("index error: " + err);
        }
        console.log(hashs);
        res.json(hashs);
    });
});

app.post('/api/hashs', function(req, res) {

    var newHash = new db.Hash({
        userId: req.user._id,
        hash: req.body.search

    });

    newHash.save(function(err, hash) {
        if (err) {
            return console.log("create error: " + err);
        }
        console.log("created ", hash.hash);

    });

    const T = new Twit({
        consumer_key: config.consumer_key,
        consumer_secret: config.consumer_secret,
        access_token: config.access_token,
        access_token_secret: config.access_token_secret,
        timeout_ms: 60 * 1000,
    })

    var params = {
        q: req.body.search,
        count: 10
    }
    T.get('search/tweets', params, function(err, data, response) {
        if (err) {
            return res.json(err)
        }
        console.log("DATA: ", data);
        res.json(data)


    });
});


var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening to ' + port);
