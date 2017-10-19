var mongoose = require('mongoose');
var User = require('./user');
var Hash = require('./hash');
var Schema = mongoose.Schema;

var HashUserSchema = new Schema({

	_user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	_hash: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Hash"
	}
})

var HashUser = mongoose.model('HashUser', HashUserSchema);
module.exports = HashUser;