var mongoose = require('../db');

var countrySchema = mongoose.Schema({
  name: { type: String, required: true, unique: true }
});

var Country = mongoose.model('Country', countrySchema);

module.exports = Country;
