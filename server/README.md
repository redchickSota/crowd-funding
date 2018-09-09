# Crowdfunding API v2 service implementation

A reference implementation for the api specification in `config/swagger-api-v2.1.6.json`.

The code is based on the skeletons from labs 3 and 4, and so has a mix of callbacks and promises, with extensions to the lab framework mostly being promise-based.

## Version history

### Version 2.1.11, 13 October 2017

- Fixed issue where GET /projects?backer=:id returned duplicate copies of a project, one for each pledge by backer to the project
- Fix for when POST /projects with rewards=[] - should now correctly ignore rather than return 500 internal server error
- Added tests for adding and updating images

### Version 2.1.10, 7 October 2017

- New config parameter `cleanstart`. If `true` (default, for compatibility with earlier behaviour) then remove any existing data and recreate the db schema on startup. If `false`, then do this only if it does not already exist.
- Sample data will only be added if `sampledata` is `true` and if the db schema has been recreated, irregardless of the value of `cleanstart` (so won't add duplicate data)
- POST /admin/reset will always reset the db schema, and will add sample data if `sampledata` is `true`

### Version 2.1.9, 6 October 2017

- Changed API response when login again with same credentials without logging out so now just return 200 and an unchanged token
- Sample images from Wikimedia Commons, under various Creative Commons licenses (see sample.data.js)

### Version 2.1.8, 4 October 2017

- Sample project data scraped from Kickstarter

### Version 2.1.7, 3 October 2017

- Fix for issue where projects created without rewards would crash model
- Functional but minimal skeleton for adding sample data on startup and through /admin/reset endpoint

### Version 2.1.6, 2 October 2017

- API version now 2.1.6
  - Always return backers and progress in GET /projects/:id. If no backers yet, then backers will be [] and progress.currentPledged and progress.numberOfBackers will both be 0.
  
### Version 2.1.5, 2 October 2017

- API version now 2.1.5
  - Corrected type of PUT /projects/:id/image to raw binary with content type of image/png or image/jpeg
- Reject an attempt to login if already logged in

### Version 2.1.4, 29 September 2017

- Updated to v2.1.4 of the API
  - Allow logins by either username or email
- Now can validate any defined query parameters not just those for GET /projects
- Fix issue where invalid query parameters to GET /projects would not send a response (res.status was used instead of res.sendStatus)
  
### Version 2.1.3, 27 September 2017

- API version now 2.1.3
  - Pledges now match user stories 2 and 5 in updated Assignment 2 briefing.
  - The 'backers' section of the ProjectDetails now contains all pledges in time-order, with username given as anonymous for anonymous pledges
  - The 'progress' section of the ProjectDetails contains the total of all pledges, and the number of unique userIds making pledges, where all anonymous backers are aggregated into one
- Tightened up schema validation to reject unexpected properties and array elements
- Added server-side CORS support for browsers
- Fix to include both token and id in response to POST /users/login

### Version 2.1.2, 

- Updated to v2.1.2 of the API and some small tidy-ups

## Usage

To start the backend service, and initialise the database, `npm start` (preferred), or `node server.js` or `docker-compose up -d`.

## Configuration

Configuration defaults are in `config/config.js`. These can be overridden in two ways (in priority order):

1. By environment variable, or command line parameter, to override any individual configuration setting. See `config/config.js` for options.
1. By values given in a javascript file in `config` named in the environment variable `NODE_ENV`, or the command line parameter `env`.
For example, if the service is started with `node server.js --env=production`, the configuration in `config/production.js` will override any default values
(but not individual values set through the environment or command line).

The default configuration assumes that a MySQL database can be found at `mysql://localhost:6033`, and that the service will run
on `http://localhost:4941/api/v2`.

For use with the department's `mysql2` MySQL server, create a config file in `config/production.json` based on the following
and start the service with `node server.js --env=production`:

```
{
    "db": {
        "host": "mysql2.csse.canterbury.ac.nz",
        "port": 3306,
        "user": <your UC usercode>,
        "password": <your assigned password - see email from beginning Term 3>,
        "database": <your UC usercode>
    }
}
```

## Sample data

Sample data can be included by setting the config variable `sampledata` to `true` (default is `false`) before starting the service. Once sample data is enabled, 
`POST /admin/reset` will also re-add the sample data after the database is reset.
 
Projects are based on a manual scraping of selected Public Good projects from Kickstarter, edited for length.
Project images have been sourced from Wikimedia Commons, under Creative Commons. Licensing information is included for each image in the 'imagelicense' in sample.data.js.

## Tests

Some simple unit tests can be run through `npm test`. They assume that a database is already running on the defined config.

The full API can be tested by starting this service with `npm start` and then running the tests from the `api-v2-test` repo.

