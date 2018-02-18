var express = require('express');
var users = express.Router();
		console.log("index");
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

module.exports = users;
