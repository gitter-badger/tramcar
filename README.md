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
