var should = require('should');
var mongoose = require('../../db');
var Category = require('../../models/category');
var Site = require('../../models/site');

describe('category', function () {
  before(function (done) {
    mongoose.connection.db.dropDatabase();
    done();
  });

  describe('saving', function () {
    before(function (done) {
      site = new Site({hostname: 'www.tramcar.org', displayName: 'Tramcar', defaultSite: true});
      site.save();
      done();
    });

    afterEach(function (done) {
      Category.remove().exec();
      done();
    });

    it('saves new record', function (done) {
      category = new Category({_site: site._id, name: 'test'});
      category.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('does not save duplicate record', function (done) {
      category = new Category({_site: site._id, name: 'test'});
      category.save(function (err) {
        duplicate = new Category({_site: site._id, name: 'test'});
          duplicate.save(function (err) {
            should.exist(err);
            done();
          });
      });
    });

    it('does not save without a name', function (done) {
      category = new Category({_site: site._id});
      category.save(function (err) {
        should.exist(err);
        err.errors.name.message.should.equal('name cannot be blank');
        done();
      });
    })

    it('does not save without a _site reference', function (done) {
      category = new Category({name: 'test'});
      category.save(function (err) {
        should.exist(err);
        err.errors._site.message.should.equal('_site cannot be blank');
        done();
      });
    })
  });
});