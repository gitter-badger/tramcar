var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jobSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    application_info: { type: String, required: true },
    location: { type: String },
    email: { type: String, required: true },
    paid_at: { type: Date },
    expired_at: { type: Date },
    _site: { type: Schema.Types.ObjectId, ref: 'Site', required: true },
    _user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    _category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    _company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    _country: { type: Schema.Types.ObjectId, ref: 'Country', required: true }
  },
  {
    timestamps: true
  }
);

var Job = mongoose.model('Job', jobSchema);

module.exports = Job;
