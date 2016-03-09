var mongoose = require('../db');
var Schema = mongoose.Schema;

var companySchema = mongoose.Schema({
  name: { type: String, required: 'name cannot be blank', unique: true },
  url: { type: String, required: 'url cannot be blank' },
  twitter: String,
  _site: { type: Schema.Types.ObjectId, ref: 'Site', required: '_site cannot be blank' },
  _user: { type: Schema.Types.ObjectId, ref: 'User', required: '_user cannot be blank' },
  _jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }]
});

var Company = mongoose.model('Company', companySchema);

module.exports = Company;
