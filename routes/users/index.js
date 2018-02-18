var express = require('express');
var users = express.Router();

// get all users
var all = require('./all');
users.get('/', all);

// check if user in the database
var read = require('./read');
users.get('/read/:user_id', read);

// register user in the database
var create = require('./create');
users.post('/create/:user_id/:name', create);

// set dow
var dow = require('./dow');
users.post('/dow/:user_id/:dow', dow);

// set should_inspire
var inspire = require('./inspire');
users.post('/inspire/:user_id/:should_inspire', inspire);

//check if user is in database in current date, sends word if so
var check = require('./check');
users.get('/check/:user_id', check);

module.exports = users;
