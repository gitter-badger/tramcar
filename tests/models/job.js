var db = require('../../db');
var should = require('should');
var Category = require('../../models/category');
var Company = require('../../models/company');
var Country = require('../../models/country');
var Job = require('../../models/job');
var Site = require('../../models/site');
var User = require('../../models/user');

describe('company', function () {
  before(function (done) {
    db.openConnection();
    Country.remove().exec();
    Job.remove().exec();
    Category.remove().exec();
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
    var site;
    var user;
    var company;
    var category;
    var country;
    var _job;

    before(function (done) {
      site = new Site({hostname: 'www.tramcar.org', displayName: 'Tramcar', defaultSite: true});
      site.save();
      user = new User({uid: 'b832727d-b682-4911-87fb-5e0a0f895406', name: 'Abc Def', _site: site.id});
      user.save();
      country = new Country({name: 'Canada'});
      country.save();
      category = new Category({name: 'Software Development', _site: site.id});
      category.save();
      company = new Company({name: 'WFH.io', url: 'https://www.wfh.io', twitter: '@WFHio'});
      company.save();

      _job = new Job({title: 'Software Developer',
                     description: 'Test description here',
                     application_info: 'https://www.wfh.io/dummy/job',
                     email: 'doesnotexist@wfh.io',
                     _site: site.id,
                     _user: user.id,
                     _category: category.id,
                     _company: company.id,
                     _country: country.id});

      done();
    });

    afterEach(function (done) {
      Job.remove().exec();
      done();
    });

    it('saves new record', function (done) {
      var clone = JSON.parse(JSON.stringify(_job));
      var job = new Job(clone);
      job.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('does not save without a title', function (done) {
      var clone = JSON.parse(JSON.stringify(_job));
      delete clone.title;
      var job = new Job(clone);
      job.save(function (err) {
        should.exist(err);
        err.errors.title.message.should.equal('title cannot be blank');
        done();
      });
    });

    it('does not save without a description', function (done) {
      var clone = JSON.parse(JSON.stringify(_job));
      delete clone.description;
      var job = new Job(clone);
      job.save(function (err) {
        should.exist(err);
        err.errors.description.message.should.equal('description cannot be blank');
        done();
      });
    });

    it('does not save without application_info', function (done) {
      var clone = JSON.parse(JSON.stringify(_job));
      delete clone.application_info;
      var job = new Job(clone);
      job.save(function (err) {
        should.exist(err);
        err.errors.application_info.message.should.equal('application_info cannot be blank');
        done();
      });
    });

    it('does not save without an email', function (done) {
      var clone = JSON.parse(JSON.stringify(_job));
      delete clone.email;
      var job = new Job(clone);
      job.save(function (err) {
        should.exist(err);
        err.errors.email.message.should.equal('email cannot be blank');
        done();
      });
    });

    it('does not save without a _site reference', function (done) {
      var clone = JSON.parse(JSON.stringify(_job));
      delete clone._site;
      var job = new Job(clone);
      job.save(function (err) {
        should.exist(err);
        err.errors._site.message.should.equal('_site cannot be blank');
        done();
      });
    });

    it('does not save without a _user reference', function (done) {
      var clone = JSON.parse(JSON.stringify(_job));
      delete clone._user;
      var job = new Job(clone);
      job.save(function (err) {
        should.exist(err);
        err.errors._user.message.should.equal('_user cannot be blank');
        done();
      });
    });

    it('does not save without a _category reference', function (done) {
      var clone = JSON.parse(JSON.stringify(_job));
      delete clone._category;
      var job = new Job(clone);
      job.save(function (err) {
        should.exist(err);
        err.errors._category.message.should.equal('_category cannot be blank');
        done();
      });
    });

    it('does not save without a _company reference', function (done) {
      var clone = JSON.parse(JSON.stringify(_job));
      delete clone._company;
      var job = new Job(clone);
      job.save(function (err) {
        should.exist(err);
        err.errors._company.message.should.equal('_company cannot be blank');
        done();
      });
    });

    it('does not save without a _country reference', function (done) {
      var clone = JSON.parse(JSON.stringify(_job));
      delete clone._country;
      var job = new Job(clone);
      job.save(function (err) {
        should.exist(err);
        err.errors._country.message.should.equal('_country cannot be blank');
        done();
      });
    });
  });
});
