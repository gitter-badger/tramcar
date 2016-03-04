var moment = require('moment');

var formatDate = function (datetime) {
  return moment(datetime).format('YYYY-MM-DD');
};

var isLoggedIn = function () {
  // NOTE: http://stackoverflow.com/questions/9609325/node-js-express-js-user-permission-security-model
  return function (req, res, next) {
    if (req.user) {
      next();
    } else {
      res
        .status(401)
        .send('Sorry, you need to be logged in to complete this request.');
    }
  };
};

module.exports = {
  formatDate: formatDate,
  isLoggedIn: isLoggedIn
};
