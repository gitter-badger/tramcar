### Welcome!

Tramcar is a self-hosted job board written in JavaScript.  As you can see by looking at the code, this project is still in its infancy and things are likely to change drastically over the coming months.  We would recommend holding off on using this software in any serious capacity until we have made several releases and key decisions have been made.  No security considerations have been made yet and it is likely you will have a bad time if you put this in production.

With that said, we would love for your involvement so please do test what we have today and let us know what does not work and what needs improvement.  This is our first JavaScript (Node.js) project and we are fully aware that we still have a lot to learn!  :)

----

### TODO:

#### 0.1.0

- Display job description and application information using markdown
- Add unique validation to models which should not have duplicate records
  (companies, categories, etc.)
 - Currently implemented at the database layer and in the controllers, but there
   has to be a better way to handle this with mongoose
- Add country fixtures so you can easily populate database on new deploy

#### Short-term

- Fix supertest tests to work w/ authenticated users so we can create
  companies, categories, etc. via POST requests rather than manually inserting
  data into mongodb
- Add admin flag to user model and allow admin users to do anything to any job
- Send tweet when job has been posted
- Add mailing list integration (mailchimp?)
- Indicate in job listings if you have clicked on a job (change link colour or
  similar?)
- Investigate and choose a front-end framework to use

#### Long-term

- Investigate alternate to markdown for formatting of job description and
  application information (pure HTML?)
