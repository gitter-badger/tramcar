var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var googleSecrets = require('./secrets')['google'];
var User = require('./models/user');

var strategy = new GoogleStrategy(
  {
    clientID: googleSecrets.clientID,
    clientSecret: googleSecrets.clientSecret,
    callbackURL: '/auth/google_oauth2/callback',
    passReqToCallback: true
  },
  function (req, accessToken, refreshToken, profile, cb) {
    User.findOne({_site: req.siteID, uid: profile.id}, function (err, user) {
      if (err) return cb(err);

      if (!user) {
        user = new User({_site: req.siteID, uid: profile.id, name: profile.displayName});
        user.save(function (err) {
          if (err) return cb(err);
        });
      }

      return cb(null, user);
    });
  }
);

passport.use(strategy);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  // NOTE: Do we need to include site_id in the select here?
  User.findOne({_id: id}, function (err, user) {
    if (err) return done(err);

    return done(null, user);
  });
});

module.exports = passport;
