var express = require('express');
var categoriesController = require('../controllers/categories');
var isLoggedIn = require('../utils')['isLoggedIn'];

var categoryRoutes = function categoryRoutes (parser) {
  var router = express.Router();

  router.get('/', categoriesController.indexAction);
  router.get('/:id/jobs', categoriesController.jobsAction);
  router.post('/', isLoggedIn(), parser, categoriesController.createAction);
  router.get('/new', isLoggedIn(), categoriesController.newAction);

  return router;
};

module.exports = categoryRoutes;
