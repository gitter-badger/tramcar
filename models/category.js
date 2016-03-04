var mongoose = require('../db');
var Schema = mongoose.Schema;

var categorySchema = mongoose.Schema({
  name: String,
  _site: { type: Schema.Types.ObjectId, ref: 'Site' }
});

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;
