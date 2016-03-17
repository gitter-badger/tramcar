var mongoose = require('mongoose');

var countrySchema = mongoose.Schema({
  name: { type: String, required: 'name cannot be blank', unique: true }
});

var Country = mongoose.model('Country', countrySchema);

module.exports = Country;
