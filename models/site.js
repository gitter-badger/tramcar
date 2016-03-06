var mongoose = require('../db');

var siteSchema = mongoose.Schema({
  hostname: { type: String, required: true },
  displayName: { type: String, required: true },
  defaultSite: { type: Boolean, default: false }
});

var Site = mongoose.model('Site', siteSchema);

module.exports = Site;
