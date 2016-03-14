var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jobSchema = mongoose.Schema(
  {
    title: { type: String, required: 'title cannot be blank' },
    description: { type: String, required: 'description cannot be blank' },
    application_info: { type: String, required: 'application_info cannot be blank' },
    location: { type: String },
    email: { type: String, required: 'email cannot be blank' },
    paid_at: { type: Date },
    expired_at: { type: Date },
    _site: { type: Schema.Types.ObjectId, ref: 'Site', required: '_site cannot be blank' },
    _user: { type: Schema.Types.ObjectId, ref: 'User', required: '_user cannot be blank' },
    _category: { type: Schema.Types.ObjectId, ref: 'Category', required: '_category cannot be blank' },
    _company: { type: Schema.Types.ObjectId, ref: 'Company', required: '_company cannot be blank' },
    _country: { type: Schema.Types.ObjectId, ref: 'Country', required: '_country cannot be blank' }
  },
  {
    timestamps: true
  }
);

var Job = mongoose.model('Job', jobSchema);

module.exports = Job;
