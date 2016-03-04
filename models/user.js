var mongoose = require('../db');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
  uid: String,
  name: String,
  _site: { type: Schema.Types.ObjectId, ref: 'Site' }
});

var User = mongoose.model('User', userSchema);

module.exports = User;
