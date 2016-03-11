var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = mongoose.Schema({
  name: { type: String, required: 'name cannot be blank', unique: true },
  _site: { type: Schema.Types.ObjectId, ref: 'Site', required: '_site cannot be blank' }
});

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;
