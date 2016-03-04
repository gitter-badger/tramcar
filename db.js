var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';
var connection = require('./secrets')['mongo'][env]['connection'];

mongoose.connect('mongodb://localhost/' + connection.database);

// mongoose.set('debug', true)

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

module.exports = mongoose;
