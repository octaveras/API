//webserver
var connect = require('connect');
var http = require('http');
var fs = require('fs');

var express = require("express");
var routes = express.Router();

var users = require('./users');
routes.use('/users', users);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Let\'s go!!!' });
});

module.exports = routes;

var app = connect();

http.createServer(app).listen("8888")//
console.log("Server is now running");
