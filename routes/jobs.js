var express = require('express');
var jobsController = require('../controllers/jobs');
var isLoggedIn = require('../utils')['isLoggedIn'];

var jobRoutes = function jobRoutes (parser) {
  var router = express.Router();

  router.get('/', jobsController.indexAction);
  router.post('/', isLoggedIn(), parser, jobsController.createAction);
  router.get('/new', isLoggedIn(), jobsController.newAction);
  router.get('/:id', jobsController.showAction);
  router.put('/:id', isLoggedIn(), parser, jobsController.updateAction);
  router.get('/:id/edit', isLoggedIn(), jobsController.editAction);
  router.delete('/:id', isLoggedIn(), jobsController.deleteAction);
  // TODO: This should be updated to use PATCH
  router.put('/:id/expire', isLoggedIn(), jobsController.expireAction);

  return router;
};

module.exports = jobRoutes;
