var Company = require('../models/company');

var companiesController = {
  indexAction: function indexAction (req, res, next) {
    Company
      .find({_site: req.siteID})
      .populate('_jobs')
      .sort({name: 'asc'})
      .exec(function (err, companies) {
        if (err) next(err);
        res.render('companies/index', {companies: companies});
      });
  },
  createAction: function createAction (req, res, next) {
    req.checkBody('name', 'Invalid name').notEmpty();
    req.checkBody('url', 'Invalid URL').notEmpty();

    var errors = req.validationErrors();

    var company = new Company();
    company.set(req.body);
    company.set({_site: req.siteID, _user: req.user.id});

    if (errors) {
      res.render('companies/new', {company: company, errors: errors});
    } else {
      company.save(function (err) {
        if (err) {
          // Need to find a way to move this into middleware etc.
          if (err.code === 11000) {
            var error = {};
            error.param = 'name';
            error.msg = 'Duplicate name';
            error.value = '';
            res.render('companies/new', {company: company, errors: [error]});
          } else {
            next(err);
          }
        } else {
          res.redirect('/companies/' + company.id);
        }
      });
    }
  },
  newAction: function newAction (req, res, next) {
    var company = new Company();
    res.render('companies/new', {company: company});
  },
  showAction: function showAction (req, res, next) {
    Company
      .findOne({_site: req.siteID, _id: req.params.id})
      .populate({
        path: '_jobs _users',
        populate: {path: '_category'}
      })
      .populate('_user')
      .exec(function (err, company) {
        if (err) next(err);

        if (company) {
          res.render('companies/show', {company: company});
        } else {
          res.status(404).send("Sorry, can't find company with ID " + req.params.id);
        }
      });
  },
  updateAction: function updateAction (req, res, next) {
    req.checkBody('name', 'Invalid name').notEmpty();
    req.checkBody('url', 'Invalid URL').notEmpty();

    var errors = req.validationErrors();

    Company.findOne({_site: req.siteID, _id: req.params.id}, function (err, company) {
      if (company) {
        if (errors) {
          // We add req.params.id to req.body as we need it to populate the edit view
          company.set(req.body);
          res.render('companies/edit', {company: company, errors: errors});
        } else {
          company
            .update(req.body, function (err) {
              if (err) {
                // Need to find a way to move this into middleware etc.
                if (err.code === 11000) {
                  var error = {};
                  error.param = 'name';
                  error.msg = 'Duplicate name';
                  error.value = '';
                  res.render('companies/edit', {company: company, errors: [error]});
                } else {
                  next(err);
                }
              } else {
                res.redirect('/companies/' + company.id);
              }
            });
        }
      }
    });
  },
  editAction: function editAction (req, res, next) {
    Company.findOne({_site: req.siteID, _id: req.params.id}, function (err, company) {
      if (company) {
        res.render('companies/edit', {company: company});
      } else {
        res.status(404).send("Sorry, can't find company with ID " + req.params.id);
      }
    });
  },
  // TODO: We need to also cleanse out jobs assigned to this company, or disallow deletion
  //       if the company has jobs assigned to it.
  deleteAction: function deleteAction (req, res, next) {
    Company.findOne({_site: req.siteID, _id: req.params.id}, function (err, company) {
      if (company) {
        if (company._jobs.length > 0) {
          // TODO: We need to notify the user why the company has not been deleted
          res.redirect('/companies/' + company.id);
        } else {
          company.remove();
          res.redirect('/companies');
        }
      }
    });
  }
};

module.exports = companiesController;
