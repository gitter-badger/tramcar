var request = require('supertest');
var db = require('../db');
var app = require('../app');
var Category = require('../models/category');
var Company = require('../models/company');
var Country = require('../models/country');
var Job = require('../models/job');
var Site = require('../models/site');
var User = require('../models/user');

var category;
var company;
var country;
var job;
var user;
var site;

before(function (done) {
  db.openConnection();
  Category.remove().exec();
  Company.remove().exec();
  Country.remove().exec();
  Job.remove().exec();
  Site.remove().exec();
  User.remove().exec();

  country = new Country({name: 'ControllerCountry1'});
  country.save();
  site = new Site({hostname: 'www.controllersite1.com', displayName: 'ControllerSite1', defaultSite: true});
  site.save();
  user = new User({uid: 'b832727d-b682-4911-87fb-5e0a0f895406', name: 'ControllerUser1', _site: site.id});
  user.save();
  category = new Category({_site: site._id, name: 'ControllerCategory1'});
  category.save();
  company = new Company({_site: site._id, _user: user.id, name: 'ControllerCompany1', url: 'https://www.controllercompany1.com'});
  company.save();
  job = new Job({_site: site._id,
                 _user: user._id,
                 _company: company._id,
                 _category: category._id,
                 _country: country._id,
                 title: 'test',
                 description: 'test',
                 application_info: 'test',
                 email: 'test@test.com'});
  job.save();

  done();
});

after(function (done) {
  db.closeConnection();
  done();
});

describe('/categories', function () {
  it('GET /', function (done) {
    request(app)
      .get('/categories')
      .expect('Content-Type', /text\/html/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        done();
      });
  });

  it('GET /new', function (done) {
    request(app)
      .get('/categories/new')
      .expect('Content-Type', /text\/html/)
      .expect(401)
      .end(function (err, res) {
        if (err) throw err;
        done();
      });
  });

  it('POST /', function (done) {
    request(app)
      .post('/categories')
      .expect('Content-Type', /text\/html/)
      .expect(401)
      .end(function (err, res) {
        if (err) throw err;
        done();
      });
  });

  it('GET /id/jobs', function (done) {
    request(app)
      .get('/categories/' + category._id + '/jobs')
      .expect('Content-Type', /text\/html/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        done();
      });
  });
});

describe('/jobs', function () {
  it('GET /', function (done) {
    request(app)
      .get('/jobs')
      .expect('Content-Type', /text\/html/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        done();
      });
  });

  it('GET /new', function (done) {
    request(app)
      .get('/jobs/new')
      .expect('Content-Type', /text\/html/)
      .expect(401)
      .end(function (err, res) {
        if (err) throw err;
        done();
      });
  });

  it('POST /', function (done) {
    request(app)
      .post('/jobs/')
      .expect('Content-Type', /text\/html/)
      .expect(401)
      .end(function (err, res) {
        if (err) throw err;
        done();
      });
  });

  it('GET /id', function (done) {
    request(app)
      .get('/jobs/' + job.id)
      .expect('Content-Type', /text\/html/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        done();
      });
  });

  it('GET /id/edit', function (done) {
    request(app)
      .get('/jobs/' + job._id + '/edit')
      .expect('Content-Type', /text\/html/)
      .expect(401)
      .end(function (err, res) {
        if (err) throw err;
        done();
      });
  });

  it('PUT /id/expire', function (done) {
    request(app)
      .put('/jobs/' + job._id + '/expire')
      .type('form')
      .send()
      .expect('Content-Type', /text\/html/)
      .expect(401)
      .end(function (err, res) {
        if (err) throw err;
        done();
      });
  });

  it('PUT /id', function (done) {
    request(app)
      .put('/jobs/' + job._id)
      .type('form')
      .send({ title: 'test', description: 'updated description', application_info: 'test', category_id: 1, company_id: 1, email: 'test@test.com' })
      .expect('Content-Type', /text\/html/)
      .expect(401)
      .end(function (err, res) {
        if (err) throw err;
        done();
      });
  });

  it('DELETE /id', function (done) {
    request(app)
      .delete('/jobs/' + job.id)
      .type('form')
      .send()
      .expect('Content-Type', /text\/html/)
      .expect(401)
      .end(function (err, res) {
        if (err) throw err;
        done();
      });
  });
});

describe('/companies', function () {
  it('GET /', function (done) {
    request(app)
      .get('/companies')
      .expect('Content-Type', /text\/html/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        done();
      });
  });

  it('GET /new', function (done) {
    request(app)
      .get('/companies/new')
      .expect('Content-Type', /text\/html/)
      .expect(401)
      .end(function (err, res) {
        if (err) throw err;
        done();
      });
  });

  it('POST /', function (done) {
    request(app)
      .post('/companies')
      .expect('Content-Type', /text\/html/)
      .expect(401)
      .end(function (err, res) {
        if (err) throw err;
        done();
      });
  });

  it('GET /id', function (done) {
    request(app)
      .get('/companies/' + company.id)
      .expect('Content-Type', /text\/html/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        done();
      });
  });

  it('GET /id/edit', function (done) {
    request(app)
      .get('/companies/' + company.id + '/edit')
      .expect('Content-Type', /text\/html/)
      .expect(401)
      .end(function (err, res) {
        if (err) throw err;
        done();
      });
  });

  it('PUT /id', function (done) {
    request(app)
      .put('/companies/' + company.id)
      .type('form')
      .send({ name: 'Tramcar', url: 'https://www.tramcar.org', twitter: 'tramcarjs' })
      .expect('Content-Type', /text\/html/)
      .expect(401)
      .end(function (err, res) {
        if (err) throw err;
        done();
      });
  });

  it('DELETE /id', function (done) {
    request(app)
      .delete('/companies/' + company.id)
      .type('form')
      .send()
      .expect('Content-Type', /text\/html/)
      .expect(401)
      .end(function (err, res) {
        if (err) throw err;
        done();
      });
  });
});
