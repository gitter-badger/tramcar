var mongoose = require('../db');
var Schema = mongoose.Schema;

var categorySchema = mongoose.Schema({
  name: { type: String,
          required: true,
          unique: true,
          validator: {
            validator: function(v, err) {
              console.log(err);
            }
          }
        },
  _site: { type: Schema.Types.ObjectId, ref: 'Site', required: true }
});

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;
