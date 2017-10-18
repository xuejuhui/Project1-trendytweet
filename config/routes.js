//controllers group your logic logically

var express = require('express');
var router = express.router(); //creating a reusable bit of code - instea of app.get, app.post, etc - we are dot chaining
var staticController = require('..controllers/staticsController'); //all things declared in users.js file
var usersController = require('..controllers/usersController');
var searchesController = require('..controllers/searchesController');
var likedTweetsController = require('..controllers/likedTweetsController');

router.route('/')
  .get(staticController.home);

router.route('/users')
  .get(usersController.users);

router.route('/users/id:')
  .get(usersController.index);

// router.route('/users/keywords')
//   .get();

// router.route('/users/likedTweets')
//   .get();


module.experts = router; //make these routes globally available
