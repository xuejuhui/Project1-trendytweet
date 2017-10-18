//require node packages
var express = require('express');
var flash = require('connect-flash'); //used for displaying message to user (like console log)
var ejslayouts = require('express-ejs-layouts'); //allows you to use ejs formats - templted files writing html and javascript at the same time
var bodyParser = require('body-parser'); //allows you to get data from a POST request -i.e. when you have a for with query strings, this helps parse it
var session = require('express-session');

//require controllers and models
var db = require ('./models'); //this is your database table structure (or odjects in mongo)
var controllers = require ('./controllers'); //presenting the directory of controllers (your functions) for the application

//Initialize express app
app = express();

//app.use re.header allows us to use express locally which normally is blocked
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*"); //allow all origins of connections - allowing your computer the server and client at the same time
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next(); //this may always be running so look at the next function to execute
});

app.use(express.static('public')); //makes your public directories public in your root
app.use(bodyParser.urlencoded({extended: true})); //call bodyParser
app.use(session({secret: "WDI-GENERAL-ESSEMBLY-EXPRESS"}));
app.use(flash());

//Express settings
app.set('view engine', 'ejs'); //we've decided to use ejs to build our pages
app.set("views", _dirname + "/views"); //_dirname starts wherever your server.js file lives

var routes = require("/confis/routes");
app.use(routes); //requiring is basically importing all of your javascript files

app.listen(process.end.PORT || 3000, function(){
  console.log("Express server is up and running on localhost 3000")
}); 
