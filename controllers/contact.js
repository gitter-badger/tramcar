var nodemailer = require('nodemailer');
var smtpConfig = require('../secrets')['smtpConfig'];

var contactController = {
  createAction: function createAction (req, res, next) {
    req.checkBody('name', 'Invalid name').notEmpty();
    req.checkBody('email', 'Invalid e-mail').notEmpty();
    req.checkBody('subject', 'Invalid subject').notEmpty();
    req.checkBody('message', 'Invalid message').notEmpty();

    var errors = req.validationErrors();

    var contact = req.body;
    contact.siteID = req.siteID;

    if (errors) {
      res.render('contact/new', {contact: contact, errors: errors});
    } else {
      // create reusable transporter object using the default SMTP transport
      var transporter = nodemailer.createTransport(smtpConfig);

      // setup e-mail data with unicode symbols
      var mailOptions = {
        from: contact.name + ' <' + contact.email + '>', // sender address
        to: 'admin@wfh.io', // list of receivers
        subject: '[TRAMCAR] ' + contact.subject,
        text: contact.message
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Message sent: ' + info.response);
        }
      });

      res.redirect('/contact/new');
    }
  },
  newAction: function newAction (req, res, next) {
    var contact = {};
    res.render('contact/new', {contact: contact});
  }
};

module.exports = contactController;
