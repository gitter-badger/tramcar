var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
  uid: String,
  name: String,
  _site: { type: Schema.Types.ObjectId, ref: 'Site', required: true }
});

var User = mongoose.model('User', userSchema);

module.exports = User;
