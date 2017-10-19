var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var HashSchema = new Schema({
	hash: String
})

var Hash = mongoose.model('Hash', HashSchema);
module.exports = Hash;