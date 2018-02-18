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
users.post('/create/:user_id', create);

module.exports = users;
