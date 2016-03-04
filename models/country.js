var mongoose = require('../db');

var countrySchema = mongoose.Schema({
  name: String
});

var Country = mongoose.model('Country', countrySchema);

module.exports = Country;
