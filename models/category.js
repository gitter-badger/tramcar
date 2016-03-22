var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = mongoose.Schema({
  name: { type: String, required: 'name cannot be blank' },
  _site: { type: Schema.Types.ObjectId, ref: 'Site', required: '_site cannot be blank' }
});

// Adding unique to name above won't work as the name and _site combination need
// to be unique.
categorySchema.index({ name: 1, _site: 1 }, { unique: true });

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;
