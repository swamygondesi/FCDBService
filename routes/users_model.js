var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  username:String,
  password:String,
  role: String,
  counterid: String
});

module.exports = mongoose.models.user || mongoose.model('user', UserSchema);
