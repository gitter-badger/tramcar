var mongoose = require('mongoose');

var siteSchema = mongoose.Schema({
  hostname: { type: String, required: 'hostname cannot be blank', unique: true },
  displayName: { type: String, required: 'displayName cannot be blank' },
  defaultSite: { type: Boolean, default: false }
});

var Site = mongoose.model('Site', siteSchema);

module.exports = Site;
