var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var companySchema = mongoose.Schema({
  name: { type: String, required: 'name cannot be blank' },
  url: { type: String, required: 'url cannot be blank' },
  twitter: String,
  _site: { type: Schema.Types.ObjectId, ref: 'Site', required: '_site cannot be blank' },
  _user: { type: Schema.Types.ObjectId, ref: 'User', required: '_user cannot be blank' },
  _jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }]
});

// Adding unique to name above won't work as the name and _site combination need
// to be unique.
companySchema.index({ name: 1, _site: 1 }, { unique: true });

var Company = mongoose.model('Company', companySchema);

module.exports = Company;
