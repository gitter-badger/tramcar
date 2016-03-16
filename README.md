### Welcome!

Tramcar is a self-hosted job board written in JavaScript.  As you can see by looking at the code, this project is still in its infancy and things are likely to change drastically over the coming months.  We would recommend holding off on using this software in any serious capacity until we have made several releases and key decisions have been made.  No security considerations have been made up to this point and it is likely that you will be running in an insecure capacity if you deploy this to production today.

With that said, we would love for your involvement so please do test what we have today and let us know what does not work and what needs improvement.  This is our first JavaScript (Node.js) project and we are fully aware that we still have a lot to learn!  :)

----

### Installation

This software has been tested using MongoDB 3.2.x and Node.js v4.x.  We recommend installing MongoDB from:

https://www.mongodb.org/downloads#production

... and Node.js from either:

https://nodejs.org/en/download/

https://github.com/nodesource/distributions

The latter URL provides a list of binary distribution channels which are useful when deploying Tramcar to a production machine running Linux, etc.

Once those requirements have been installed, execute the following commands to download and run Tramcar in a development environment:

```
$ git clone https://github.com/wfhio/tramcar
$ cd tramcar
$ npm install
$ cp secrets.js.example secrets.js
$ bin/mongoimport -d tramcar_development -c countries  < countries.dump
$ npm start
```

Tramcar should now be accessible on <http://localhost:3000>.  If your MongoDB server is not running on localhost, then update the secrets.js file to reflect the correct host.

___NOTE:___ At this point, browsing <http://localhost:3000> will raise a message stating `No valid site found`.  Until we have implemented a default setup form where the default site can be specified, simply log into the MongoDB client shell and issue the following:

```
$ bin/mongo tramcar_development
> db.sites.insert({hostname:"www.wfh.io",displayName:"WFH.io",defaultSite:true})
```

In the above, replace the WFH.io-related details with the appropriate values for your specified job board.

----

### TODO

#### 0.1.0

- Complete all model tests

#### Short-term

- Add a form that is loaded when no site exists in the MongoDB database (this
  will avoid having to manually enter the site via the MongoDB client)
- Add local logins using passsport.js (this has been requested several times on
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
