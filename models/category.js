var mongoose = require('../db');
var Schema = mongoose.Schema;

var categorySchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  _site: { type: Schema.Types.ObjectId, ref: 'Site', required: true }
});

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;
