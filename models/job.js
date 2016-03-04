var mongoose = require('../db');
var Schema = mongoose.Schema;

var jobSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    application_info: String,
    location: String,
    email: String,
    paid_at: { type: Date },
    expired_at: { type: Date },
    _site: { type: Schema.Types.ObjectId, ref: 'Site' },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    _category: { type: Schema.Types.ObjectId, ref: 'Category' },
    _company: { type: Schema.Types.ObjectId, ref: 'Company' },
    _country: { type: Schema.Types.ObjectId, ref: 'Country' }
  },
  {
    timestamps: true
  }
);

var Job = mongoose.model('Job', jobSchema);

module.exports = Job;
