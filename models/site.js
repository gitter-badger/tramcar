var mongoose = require('../db');

var siteSchema = mongoose.Schema({
  hostname: String,
  displayName: String,
  defaultSite: Boolean
});

var Site = mongoose.model('Site', siteSchema);

module.exports = Site;
