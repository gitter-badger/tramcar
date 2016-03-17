### TODO

#### 0.1.0

- Ready to release!

#### Short-term

- Add a form that is loaded when no site exists in the MongoDB database (this
  will avoid having to manually enter the site via the MongoDB client)
- Add local logins using passport.js (this has been requested several times on
  WFH.io)
- Add ability to specify if a job is remote, and add ability to switch entire
  site to remote so that each individual job does not need to be specified
  as remote
- Write mongoose validator middleware which throws appropriate message when a
  duplicate record is saved
 - Currently implemented at the database layer and in the controllers, but there
   has to be a better way to handle this with mongoose
- Look at mongoose's browser validations to replace express-validator
  middleware
- Fix supertest tests to work w/ authenticated users so we can create
  companies, categories, etc. via POST requests rather than manually inserting
  data into mongodb
- Add admin flag to user model and allow admin users to do anything to any job
- Send tweet, post to Facebook, etc. when a job has been posted and paid for
- Add mailing list integration (mailchimp?)
- Add payment integration (Stripe?)
- Add token system for free job purchases
- Send an e-mail when a job expires
- Indicate in job listings if you have clicked on a job (change link colour or
  similar?)
- Investigate and choose a front-end framework to use

#### Long-term

- Investigate alternate to markdown for formatting of job description and
  application information (pure HTML?)
- Multi-language support
- Add ability to override templates
