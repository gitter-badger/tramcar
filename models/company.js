var mongoose = require('../db');
var Schema = mongoose.Schema;

var companySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  url: String,
  twitter: String,
  _site: { type: Schema.Types.ObjectId, ref: 'Site' },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  _jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }]
});

var Company = mongoose.model('Company', companySchema);

module.exports = Company;
