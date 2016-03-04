var Category = require('../models/category');
var Job = require('../models/job');

var categoriesController = {
  indexAction: function indexAction (req, res, next) {
    Category
      .find({_site: req.siteID})
      .sort({name: 'asc'})
      .exec(function (err, categories) {
        if (err) next(err);
        res.render('categories/index', {categories: categories});
      });
  },
  jobsAction: function jobsAction (req, res, next) {
    Category.findOne({_site: req.siteID, _id: req.params.id}, function (err, category) {
      if (category) {
        Job
          .find({_site: req.siteID, _category: category.id})
          .populate('_company _category')
          .sort({created_at: -1})
          .exec(function (err, jobs) {
            res.render('jobs/index', {jobs: jobs});
          });
      } else {
        res.status(404).send("Sorry, can't find category with ID " + req.params.id);
      }
    });
  },
  createAction: function createAction (req, res, next) {
    req.checkBody('name', 'Invalid name').notEmpty();

    var errors = req.validationErrors();

    var category = new Category();
    category.set(req.body);
    category.set({_site: req.siteID});

    if (errors) {
      res.render('categories/new', {category: category, errors: errors});
    } else {
      category.save(function (err) {
        if (err) next(err);
        res.redirect('/categories');
      });
    }
  },
  newAction: function newAction (req, res, next) {
    var category = new Category();
    res.render('categories/new', {category: category});
  }
};

module.exports = categoriesController;
