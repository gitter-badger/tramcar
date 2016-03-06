var mongoose = require('../db');
var Schema = mongoose.Schema;

var companySchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  twitter: String,
  _site: { type: Schema.Types.ObjectId, ref: 'Site', required: true },
  _user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  _jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }]
});

var Company = mongoose.model('Company', companySchema);

module.exports = Company;
