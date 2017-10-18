// var userList = [{
//   _id:01,
//   username: sh3llslut,
//   firstName: Masha,
//   lastName: Arbisman
// }];
//
var db = require('../models'); //goes up a directory, finds the models folder, and comes back

function userShow(req,res){
//GET user information such as session id and username to show on our portal page
}

function userUpdate(req,res){
//PUT
}

function userDelete(req,res){
//DESTROY
}


//express notes : GET,POST,PUT,DESTROY
//GET: get information from the server
//POST: post information onto server
//PUT: update information on server
//DESTROY: delete information from server)

module.exports = {
  userShow: userShow,
  userUpdate: userUpdate,
  userDelete: userDelete,
}

//we export each function to be public to the application,
//we do this by referring to the function name and giving it another name (easier to keep them the same)
//first userShow is the key, second userShow is the property. (key:property) value pairs
