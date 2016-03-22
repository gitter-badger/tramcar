var db = require('../../db');
var should = require('should');
var Company = require('../../models/company');
var Site = require('../../models/site');
var User = require('../../models/user');

describe('company', function () {
  before(function (done) {
    db.openConnection();
    Company.remove().exec();
    User.remove().exec();
    Site.remove().exec();
    done();
  });

  after(function (done) {
    db.closeConnection();
    done();
  });

  describe('saving', function () {
    var site1;
    var site2;
    var user;

    before(function (done) {
      site1 = new Site({hostname: 'www.companysite1.com', displayName: 'CompanySite1', defaultSite: true});
      site1.save();
      site2 = new Site({hostname: 'www.companysite2.com', displayName: 'CompanySite2', defaultSite: false});
      site2.save();
      user = new User({uid: 'b832727d-b682-4911-87fb-5e0a0f895406', name: 'Abc Def', _site: site1.id});
      user.save();
      done();
    });

    afterEach(function (done) {
      Company.remove().exec();
      done();
    });

    it('saves new record', function (done) {
      var company = new Company({_site: site1._id, _user: user.id, name: 'CompanyCompany1', url: 'https://companycompany1.com', twitter: 'companycompany1'});
      company.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('does not save duplicate name for same _site', function (done) {
      var company = new Company({_site: site1._id, _user: user.id, name: 'CompanyCompany1', url: 'https://companycompany1.com'});
      company.save(function (err) {
        if (err) throw err;
        var duplicate = new Company({_site: site1._id, _user: user.id, name: 'CompanyCompany1', url: 'https://companycompany1.com'});
        duplicate.save(function (err) {
          should.exist(err);
          done();
        });
      });
    });

    it('does save duplicate name for different _site', function (done) {
      var company = new Company({_site: site1._id, _user: user.id, name: 'CompanyCompany1', url: 'https://companycompany1.com'});
      company.save(function (err) {
        if (err) throw err;
        var duplicate = new Company({_site: site2._id, _user: user.id, name: 'CompanyCompany1', url: 'https://companycompany1.com'});
        duplicate.save(function (err) {
          should.not.exist(err);
          done();
        });
      });
    });

    it('does not save without a name', function (done) {
      var company = new Company({_site: site1._id, _user: user.id, url: 'https://companycompany1.com'});
      company.save(function (err) {
        should.exist(err);
        err.errors.name.message.should.equal('name cannot be blank');
        done();
      });
    });

    it('does not save without a URL', function (done) {
      var company = new Company({_site: site1._id, _user: user.id, name: 'CompanyCompany1'});
      company.save(function (err) {
        should.exist(err);
        err.errors.url.message.should.equal('url cannot be blank');
        done();
      });
    });

    it('does not save without a _site reference', function (done) {
      var company = new Company({_user: user.id, name: 'CompanyCompany1', url: 'https://companycompany1.com'});
      company.save(function (err) {
        should.exist(err);
        err.errors._site.message.should.equal('_site cannot be blank');
        done();
      });
    });

    it('does not save without a _user reference', function (done) {
      var company = new Company({_site: site1._id, name: 'Tramcar', url: 'https://companycompany1.com'});
      company.save(function (err) {
        should.exist(err);
        err.errors._user.message.should.equal('_user cannot be blank');
        done();
      });
    });
  });
});
