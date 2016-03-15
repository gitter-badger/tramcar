var app = require('./app');
var env = process.env.NODE_ENV || 'development';
var bindInfo = require('./secrets')['server'][env];

var server = app.listen(bindInfo.port, function () {
  var host = bindInfo.ip;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
