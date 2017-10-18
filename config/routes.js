//controllers group your logic logically

var express = require('express');
var router = express.router(); //creating a reusable bit of code - instea of app.get, app.post, etc - we are dot chaining
var controllers = require('../controllers');

//routes: object as defined above, within index find the controller, within the controller run the function
router.route('/likedTweets')
  .get(controllers.tweets.show);

router.route('/users')
  .get(controller.users.usersShow);

router.route('/searches:')
  .get(controller.searches.searchesShow);


module.experts = router; //make these routes globally available
