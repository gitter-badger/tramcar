### Welcome!

Tramcar is a self-hosted job board written in JavaScript.  As you can see by looking at the code, this project is still in its infancy and things are likely to change drastically over the coming months.  We would recommend holding off on using this software in any serious capacity until we have made several releases and key decisions have been made.  No security considerations have been made yet and it is likely you will have a bad time if you put this in production.

With that said, we would love for your involvement so please do test what we have today and let us know what does not work and what needs improvement.  This is our first JavaScript (Node.js) project and we are fully aware that we still have a lot to learn!  :)

----

### TODO:

#### 0.1.0

- Add country fixtures so you can easily populate database on new deploy
- Complete all model tests

#### Short-term

- Bump eslint to ^2.3.0
- Integrate GitHub with Travis CI so we can catch errors on PRs
- Write mongoose validator middleware which throws appropriate message when a
  duplicate duplicate record is saved
 - Currently implemented at the database layer and in the controllers, but there
   has to be a better way to handle this with mongoose
- Look at mongoose's browser validations to replace express-validator
  middleware
- Fix supertest tests to work w/ authenticated users so we can create
  companies, categories, etc. via POST requests rather than manually inserting
  data into mongodb
- Add admin flag to user model and allow admin users to do anything to any job
- Send tweet when job has been posted
- Add mailing list integration (mailchimp?)
- Add payment integration (Stripe?)
- Send an e-mail when a job expires
- Indicate in job listings if you have clicked on a job (change link colour or
  similar?)
- Investigate and choose a front-end framework to use

#### Long-term

- Investigate alternate to markdown for formatting of job description and
  application information (pure HTML?)
- Multi-language support
- Add ability to override templates
