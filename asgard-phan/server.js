

const express = require('express');
var Mongo = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
// const auth = require('okta');
//var auth =require('passport')
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/phantasyleague", { native_parser: true });
db.bind('events');

var udb = mongo.db("mongodb://localhost:27017/phantasyleague", { native_parser: true });
udb.bind('userpicks');

//const mongodb = require('mongodb');
//const mongojs = require('mongojs');
// const auth = require('okta');
const bodyParser = require('body-parser');
const logger = require("morgan");

const server = express();
const port = 2000;


// Mongo Database Server
server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// CORS
server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Set the app up with morgan, body-parser, and a static folder
server.use(logger("dev"));
server.use(bodyParser.urlencoded({
  extended: false
}));
server.use(express.static("public"));

// Database configuration for events
//const databaseUrl = "";
//const collections = ["events"];


// Hook mongojs config to db variable
//const db = mongojs(databaseUrl, collections);
// Log any mongojs errors to console
// db.on("error", function(error) {
//   console.log("Database Error:", error);
// });

server.listen(port, (err) => {
  if (err) {
    return console.log('\nsomething bad happened', err)
  }

  console.log(`\nserver is listening on ${port}`)
});

// Root path
server.get("/", function (req, res) {
  res.send("Sup world");
});

// Route for displaying userpick form when Register button is clicked

// Route for retrieving and showing events in component route
server.get("/events", function (req, res) {
  getEvents()
    .then(function (events) {
      res.send(events);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
});

function getEvents() {
  var deferred = Q.defer();
  db.events.find().toArray(function (err, events) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(events);
  });
  return deferred.promise;
}

server.get("/event", function (req, res) {
  var id = req.query.id;
  getEventById(id)
    .then(function (events) {
      res.send(events);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
});

function getEventById(_id) {
  var deferred = Q.defer();

  db.events.findById(ObjectId(_id), function (err, event) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    if (event) {
      deferred.resolve(event);
    } else {
      // user not found
      deferred.resolve();
    }
  });

  return deferred.promise;
}

server.post("/userpicks", function (req, res) {
  var item = req.body;
  
  console.log(item);
  
  createUserPicks(item)
    .then(function (events) {
      res.send(events);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });

});

function createUserPicks(item) {
  
  var deferred = Q.defer();
  udb.userpicks.insert(
    item,
    function (err, doc) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve();
    });

  return deferred.promise;
}



// // Route for Authentication and redirection
// server.get('/callback',
//   okta.authenticate('auth0', { failureRedirect: '/login' }),
//   function(req, res) {
//     if (!req.user) {
//       throw new Error('user null');
//     }
//     res.redirect("/");
//   }
// );

// server.get('/login',
//   okta.authenticate('auth0', {}), function (req, res) {
//   res.redirect("/");
// })

