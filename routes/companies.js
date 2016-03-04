var express = require('express');
var companiesController = require('../controllers/companies');
var isLoggedIn = require('../utils')['isLoggedIn'];

var companyRoutes = function companyRoutes (parser) {
  var router = express.Router();

  router.get('/', companiesController.indexAction);
  router.post('/', isLoggedIn(), parser, companiesController.createAction);
  router.get('/new', isLoggedIn(), companiesController.newAction);
  router.get('/:id', companiesController.showAction);
  router.put('/:id', isLoggedIn(), parser, companiesController.updateAction);
  router.get('/:id/edit', isLoggedIn(), companiesController.editAction);
  router.delete('/:id', isLoggedIn(), companiesController.deleteAction);

  return router;
};

module.exports = companyRoutes;
