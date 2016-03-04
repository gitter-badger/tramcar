var Job = require('../models/job');
var Category = require('../models/category');
var Company = require('../models/company');
var Country = require('../models/country');

var jobsController = {
  indexAction: function indexAction (req, res, next) {
    Job
      .find({
        _site: req.siteID,
        createdAt: {$exists: true},
        expiredAt: {$exists: false}
      })
      .populate('_company _category').sort({createdAt: -1})
      .exec(function (err, jobs) {
        res.render('jobs/index', {jobs: jobs});
      });
  },
  createAction: function createAction (req, res, next) {
    req.checkBody('title', 'Invalid title').notEmpty();
    req.checkBody('description', 'Invalid description').notEmpty();
    req.checkBody('application_info', 'Invalid application_info').notEmpty();
    req.checkBody('_category', 'Invalid category').notEmpty();
    req.checkBody('_company', 'Invalid company').notEmpty();
    req.checkBody('email', 'Invalid e-mail').notEmpty();

    var errors = req.validationErrors();

    var job = new Job();
    // TODO: MySQL will puke if we insert an empty string into an integer column,
    //       we need to find a better way to handle this
    if (req.body._country === '') {
      req.body._country = null;
    }
    job.set(req.body);
    // NOTE: paid_at should only get set when the job is paid, this
    //       will need to be updated once we have a method to pay
    job.set({_site: req.siteID, _user: req.user.id, paid_at: new Date()});

    if (errors) {
      Company.find({_site: req.siteID}, function (err, companies) {
        Country.find(function (err, countries) {
          Category.find({_site: req.siteID}, function (err, categories) {
            res.render('jobs/new', {job: job, errors: errors, categories: categories, companies: companies, countries: countries});
          });
        });
      });
    } else {
      job.save(function (err) {
        if (err) next(err);
        res.redirect('/jobs/' + job.id);
      });
      Company.findOne({_site: req.siteID, _id: job._company}, function (err, company) {
        company._jobs.push(job);
        company.save();
      });
    }
  },
  newAction: function newAction (req, res, next) {
    Company.find({_site: req.siteID}, function (err, companies) {
      Country.find(function (err, countries) {
        Category.find({_site: req.siteID}, function (err, categories) {
          var job = new Job();
          res.render('jobs/new', {job: job, categories: categories, companies: companies, countries: countries});
        });
      });
    });
  },
  showAction: function showAction (req, res, next) {
    Job
      .findOne({_site: req.siteID, _id: req.params.id})
      .populate('_company _category _country _user')
      .exec(function (err, job) {
        if (job) {
          res.render('jobs/show', {job: job});
        } else {
          res.status(404).send("Sorry, can't find job with ID " + req.params.id);
        }
      });
  },
  updateAction: function updateAction (req, res, next) {
    req.checkBody('title', 'Invalid title').notEmpty();
    req.checkBody('description', 'Invalid description').notEmpty();
    req.checkBody('_category', 'Invalid category').notEmpty();
    req.checkBody('_company', 'Invalid company').notEmpty();
    req.checkBody('application_info', 'Invalid application_info').notEmpty();
    req.checkBody('email', 'Invalid e-mail').notEmpty();

    var errors = req.validationErrors();

    Job.findOne({_site: req.siteID, _id: req.params.id}, function (err, job) {
      if (job) {
        if (errors) {
          Company.find({_site: req.siteID}, function (err, companies) {
            Country.find(function (err, countries) {
              Category.find({_site: req.siteID}, function (err, categories) {
                job.set(req.body);
                res.render('jobs/edit', {job: job, errors: errors, categories: categories, companies: companies, countries: countries});
              });
            });
          });
        } else {
          // TODO: MySQL will puke if we insert an empty string into an integer column,
          //       we need to find a better way to handle this
          if (req.body._country === '') {
            req.body._country = null;
          }
          job
            .update(req.body, function (err) {
              res.redirect('/jobs/' + job.id);
            });
        }
      }
    });
  },
  editAction: function editAction (req, res, next) {
    Job.findOne({_site: req.siteID, _id: req.params.id}, function (err, job) {
      if (job) {
        Company.find({_site: req.siteID}, function (err, companies) {
          Country.find(function (err, countries) {
            Category.find({_site: req.siteID}, function (err, categories) {
              res.render('jobs/edit', {job: job, categories: categories, companies: companies, countries: countries});
            });
          });
        });
      }
    });
  },
  deleteAction: function deleteAction (req, res, next) {
    Job.remove({_site: req.siteID, _id: req.params.id}, function (err, job) {
      res.redirect('/jobs');
    });
  },
  expireAction: function expireAction (req, res, next) {
    Job.findOne({_site: req.siteID, _id: req.params.id}, function (err, job) {
      job
        .update({expired_at: new Date()}, function (err) {
          res.redirect('/jobs/' + job.id);
        });
    });
  }
};

module.exports = jobsController;
