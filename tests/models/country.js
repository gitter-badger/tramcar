var db = require('../../db');
var should = require('should');
var Country = require('../../models/country');

describe('country', function () {
  before(function (done) {
    db.openConnection();
    Country.remove().exec();
    done();
  });

  after(function (done) {
    db.closeConnection();
    done();
  });

  describe('saving', function () {
    afterEach(function (done) {
      Country.remove().exec();
      done();
    });

    it('saves new record', function (done) {
      var country = new Country({name: 'Canada'});
      country.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('does not save duplicate record', function (done) {
      var country = new Country({name: 'Canada'});
      country.save(function (err) {
        if (err) throw err;
        var duplicate = new Country({name: 'Canada'});
        duplicate.save(function (err) {
          should.exist(err);
          done();
        });
      });
    });

    it('does not save without a name', function (done) {
      var country = new Country({});
      country.save(function (err) {
        should.exist(err);
        err.errors.name.message.should.equal('name cannot be blank');
        done();
      });
    });
  });
});
