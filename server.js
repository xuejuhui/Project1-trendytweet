//require node packages
//var express = require('express');
//var flash = require('connect-flash'); //used for displaying message to user (like console log)
//var ejslayouts = require('express-ejs-layouts'); //allows you to use ejs formats - templted files writing html and javascript at the same time
//var bodyParser = require('body-parser'); //allows you to get data from a POST request -i.e. when you have a for with query strings, this helps parse it
//var session = require('express-session');

//require controllers and models
//var db = require ('./models'); //this is your database table structure (or odjects in mongo)
//var controllers = require ('./controllers'); //presenting the directory of controllers (your functions) for the application

//Initialize express app
//app = express();

//app.use re.header allows us to use express locally which normally is blocked
//app.use(function(req,res,next){
 /// res.header("Access-Control-Allow-Origin", "*"); //allow all origins of connections - allowing your computer the server and client at the same time
 // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //next(); //this may always be running so look at the next function to execute
//});

//app.use(express.static('public')); //makes your public directories public in your root
//app.use(bodyParser.urlencoded({extended: true})); //call bodyParser
//app.use(session({secret: "WDI-GENERAL-ESSEMBLY-EXPRESS"}));
//app.use(flash());

//Express settings
//app.set('view engine', 'ejs'); //we've decided to use ejs to build our pages
//app.set("views", _dirname + "/views"); //_dirname starts wherever your server.js file lives

//var routes = require("/confis/routes");
///app.use(routes); //requiring is basically importing all of your javascript files

//app.listen(process.end.PORT || 3000, function(){
 // console.log("Express server is up and running on localhost 3000")
//}); 
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
var pass = require('./config/passport')(passport);


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
  // console.log(pass.tokenSecretG)
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
});

  var T = new Twit({
    consumer_key:         'OUjwUJqiRoqpG0gTlZcgA1mv2',
    consumer_secret:      'prILcGZOQL9bRBrnk41tD1IdE4ZTNkGuYTfvtngvRtXk9rua1H',
    access_token:         '3068070909-G5BjVgXzjIsJZG8P96NqYAx106JjthMWV9PmJ0w',
    access_token_secret:  'IEjMg4hA5YDelbBoU5hvmV0dDz7DgyZiJXSXNmzuZEADY',
    timeout_ms:           60*1000,  
  })

    // T.post('statuses/update', { status: 'ken and peng is trash' }, function(err, data, response) {
    //   console.log("POST: ", data)
    // })

    // var tweetsB=[];
    var params = { q: req.body.search , count: 10 }
    console.log(req.body.search);
    T.get('search/tweets', params , function(err, data, response){
      if(err){return res.json(err)}
      console.log("DATA: ",data);
      res.json(data)
      // tweets=data.statuses
      // for(i= 0; i<tweets.length; i++){
      //   tweetsB.push(tweets[i].text);
      // }
    });
});

// app.get('/search/tweets', function(req, response){
//   response.json(tweetsB);
// })




//    function storeHash (req, res){
//  let hashUser_id = parseInt();

//  db.hashUser.findById(req.params.id, function (error, detectedHashUser){
//    res.json (detectedHashUser);
//    detectedHashUser.append();
//  });
// }

// function destroy (req,res){
//  let hashUser_id = parseInt();

//  db.hashUser.findById(req.params.id, function(error,detectedHashUser){
//    res.json (detectedHashUser);
//      detectedHashUser.remove();
//  });
// }

// module.exports = {
//  storeHash: storeHash,
//  destroy: destroy
// };






var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening to '+port);

