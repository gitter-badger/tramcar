var db = require('../../db');
var should = require('should');
var Category = require('../../models/category');
var Site = require('../../models/site');

before(function (done) {
  db.openConnection();
  Category.remove().exec();
  Site.remove().exec();
  done();
});

after(function (done) {
  db.closeConnection();
  done();
});

describe('category', function () {
  describe('saving', function () {
    var site1;
    var site2;

    before(function (done) {
      site1 = new Site({hostname: 'www.categorysite1.com', displayName: 'CategorySite1', defaultSite: true});
      site1.save();
      site2 = new Site({hostname: 'www.categorysite2.com', displayName: 'CategorySite2', defaultSite: false});
      site2.save();
      done();
    });

    afterEach(function (done) {
      Category.remove().exec();
      done();
    });

    it('saves new record', function (done) {
      var category = new Category({_site: site1._id, name: 'CategoryCategory1'});
      category.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('does not save duplicate name for same _site', function (done) {
      var category = new Category({_site: site1._id, name: 'CategoryCategory1'});
      category.save(function (err) {
        if (err) throw err;
        var duplicate = new Category({_site: site1._id, name: 'CategoryCategory1'});
        duplicate.save(function (err) {
          should.exist(err);
          done();
        });
      });
    });

    it('does save duplicate name for different _site', function (done) {
      var category = new Category({_site: site1._id, name: 'CategoryCategory1'});
      category.save(function (err) {
        if (err) throw err;
        var duplicate = new Category({_site: site2._id, name: 'CategoryCategory1'});
        duplicate.save(function (err) {
          should.not.exist(err);
          done();
        });
      });
    });

    it('does not save without a name', function (done) {
      var category = new Category({_site: site1._id});
      category.save(function (err) {
        should.exist(err);
        err.errors.name.message.should.equal('name cannot be blank');
        done();
      });
    });

    it('does not save without a _site reference', function (done) {
      var category = new Category({name: 'CategoryCategory1'});
      category.save(function (err) {
        should.exist(err);
        err.errors._site.message.should.equal('_site cannot be blank');
        done();
      });
    });
  });
});
