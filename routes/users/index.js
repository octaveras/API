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
users.post('/create/:user_id', create);

//check if user is in database in current date, sends word if so
var check = require('./check');
words.get('/check/:user_id', check);

module.exports = users;
