//controllers group your logic logically

var express = require('express');
var router = express.router(); //creating a reusable bit of code - instea of app.get, app.post, etc - we are dot chaining
var controllers = require('../controllers');

//routes: object as defined above, within index find the controller, within the controller run the function
router.route('/hash')
  .get(controllers.hash.show);

router.route('/users')
  .get(controller.users.usersShow);

router.route('/tweets')
  .get(controller.tweets.searchesShow);

router.route('/hashUser')
  .get(controller.hashUser.hashUserShow);



module.experts = router; //make these routes globally available
