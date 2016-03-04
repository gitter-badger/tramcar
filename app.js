var express = require('express');

// Middleware
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var methodOverride = require('method-override');
var session = require('express-session');

// Models
// var Config = require('./models/config');
var Site = require('./models/site');

// Controllers
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var categories = require('./routes/categories')(urlencodedParser);
var companies = require('./routes/companies')(urlencodedParser);
var jobs = require('./routes/jobs')(urlencodedParser);

// Misc
var MongoStore = require('connect-mongo')(session);
var cookieSecrets = require('./secrets')['cookie'];
var formatDate = require('./utils')['formatDate'];
var mongoose = require('./db');
var passport = require('./passport');

var app = express();

var setSiteDetails = function (req, res, next) {
  Site.findOne({hostname: req.hostname}, function (err, site) {
    if (site) {
      req.siteID = site._id;
      next();
    } else {
      Site.findOne({defaultSite: true}, function (err, site) {
        if (site) {
          req.siteID = site._id;
          next();
        } else {
          // How do we present this error?
          next('No valid site found');
        }
      });
    }
  });
};

app.use(setSiteDetails);
app.use(expressValidator());
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
app.use(session({
  secret: cookieSecrets.secret,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(passport.initialize());
app.use(passport.session());
// NOTE: This makes user object available in every view
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});
app.use('/categories', categories);
app.use('/companies', companies);
app.use('/jobs', jobs);

app.get('/auth/google_oauth2',
  passport.authenticate('google', { scope: ['email'] }));

app.get('/auth/google_oauth2/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/jobs');
  });

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/jobs');
});

app.set('view engine', 'jade');

// NOTE: This should only get set in a development environment
// http://stackoverflow.com/questions/5276892/how-to-output-pretty-html-in-express
if (app.get('env') === 'development') {
  app.locals.pretty = true;
}

app.locals.formatDate = formatDate;

module.exports = app;
