//webserver

var express = require("express");
var routes = express.Router();

var users = require('./users');
routes.use('/users', users);
console.log("users");


var words = require('./words');
routes.use('/words', words);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Let\'s go!!!' });
});

module.exports = routes;
