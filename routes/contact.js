var express = require('express');
var contactController = require('../controllers/contact');

var ContactRoutes = function ContactRoutes (parser) {
  var router = express.Router();

  router.post('/', parser, contactController.createAction);
  router.get('/new', contactController.newAction);

  return router;
};

module.exports = ContactRoutes;
