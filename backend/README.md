# Backend

This implementation is for NodeJS based on [Express](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/) and uses [mongoose](https://mongoosejs.com/) as the ODM.

## Project setup

    npm install

### Before startup
You need a MongoDB database ready.

Make sure you have a collection named 'org' in your database that contains at least one organization with the orgid listed in your environment variable (see below).

Setup a .env file with the following variables: MONGO_URL, PORT and ORG

   MONGO_URL = 'STRING HERE'
   PORT = 3000
   ORG = '1'

Mongo URL linked seperately in blackboard submission.

We can use this variable to change the port number if we have another app already running on the default port 3000
### Compiles and hot-reloads for development

    npm start

## Postman Documentation

Can be found at <https://documenter.getpostman.com/view/23133138/2s83mdJiqh>

## ## Postman Documentation for project Add-ons per sprint 2 and 3 requirements of our Team (#28)
  Can be found at   https://documenter.getpostman.com/view/19780120/2s93eSaG4K
