var should = require('should');
var mongoose = require('../../db');
var Company = require('../../models/company');
var Site = require('../../models/site');
var User = require('../../models/user');

describe('company', function () {
  before(function (done) {
    Company.remove().exec();
    User.remove().exec();
    Site.remove().exec();
    //mongoose.connection.db.dropDatabase();
    done();
  });

  describe('saving', function () {
    var site;
    var user;

    before(function (done) {
      site = new Site({hostname: 'www.tramcar.org', displayName: 'Tramcar', defaultSite: true});
      site.save();
      user = new User({uid: 'b832727d-b682-4911-87fb-5e0a0f895406', name: 'Abc Def', _site: site.id});
      user.save();
      done();
    });

    afterEach(function (done) {
      Company.remove().exec();
      done();
    });

    it('saves new record', function (done) {
      var company = new Company({_site: site._id, _user: user.id, name: 'Tramcar', url: 'https://www.tramcar.org', twitter: 'tramcarjs'});
      company.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('does not save duplicate record', function (done) {
      var company = new Company({_site: site._id, _user: user.id, name: 'Tramcar', url: 'https://www.tramcar.org'});
      company.save(function (err) {
        var duplicate = new Company({_site: site._id, _user: user.id, name: 'Tramcar', url: 'https://www.tramcar.org'});
        duplicate.save(function (err) {
          should.exist(err);
          done();
        });
      });
    });

    it('does not save without a name', function (done) {
      var company = new Company({_site: site._id, _user: user.id, url: 'https://www.tramcar.org'});
      company.save(function (err) {
        should.exist(err);
        err.errors.name.message.should.equal('name cannot be blank');
        done();
      });
    });

    it('does not save without a URL', function (done) {
      var company = new Company({_site: site._id, _user: user.id, name: 'Tramcar'});
      company.save(function (err) {
        should.exist(err);
        err.errors.url.message.should.equal('url cannot be blank');
        done();
      });
    });


    it('does not save without a _site reference', function (done) {
      var company = new Company({_user: user.id, name: 'Tramcar', url: 'https://www.tramcar.org'})
      company.save(function (err) {
        should.exist(err);
        err.errors._site.message.should.equal('_site cannot be blank');
        done();
      });
    });

    it('does not save without a _user reference', function (done) {
      var company = new Company({_site: site._id, name: 'Tramcar', url: 'https://www.tramcar.org'})
      company.save(function (err) {
        should.exist(err);
        err.errors._user.message.should.equal('_user cannot be blank');
        done();
      });
    });

  });
});
