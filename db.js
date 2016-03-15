var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';
var connection = require('./secrets')['mongo'][env]['connection'];

var db = {
  openConnection: function openConnection () {
    mongoose.connect('mongodb://' + connection.host + '/' + connection.database);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
      // we're connected!
    });
  },
  closeConnection: function closeConnection () {
    mongoose.connection.close();
  }
};

// mongoose.set('debug', true)

module.exports = db;
