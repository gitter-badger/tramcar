var db = require('../../db');
var should = require('should');
var Site = require('../../models/site');

describe('site', function () {
  before(function (done) {
    db.openConnection();
    Site.remove().exec();
    done();
  });

  after(function (done) {
    db.closeConnection();
    done();
  });

  describe('saving', function () {
    afterEach(function (done) {
      Site.remove().exec();
      done();
    });

    it('saves new record', function (done) {
      var site = new Site({hostname: 'www.sitesite1.com', displayName: 'SiteSite1', defaultSite: true});
      site.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('does not save duplicate record', function (done) {
      var site = new Site({hostname: 'www.sitesite1.com', displayName: 'SiteSite1', defaultSite: true});
      site.save(function (err) {
        if (err) throw err;
        var duplicate = new Site({hostname: 'www.sitesite1.com', displayName: 'SiteSite1', defaultSite: true});
        duplicate.save(function (err) {
          should.exist(err);
          done();
        });
      });
    });

    it('does not save without a hostname', function (done) {
      var site = new Site({displayName: 'SiteSite1.com', defaultSite: true});
      site.save(function (err) {
        should.exist(err);
        err.errors.hostname.message.should.equal('hostname cannot be blank');
        done();
      });
    });

    it('does not save without a displayName', function (done) {
      var site = new Site({hostname: 'www.sitesite1.com', defaultSite: true});
      site.save(function (err) {
        should.exist(err);
        err.errors.displayName.message.should.equal('displayName cannot be blank');
        done();
      });
    });
  });
});
