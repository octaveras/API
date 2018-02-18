var express = require('express');
var users = express.Router();

// get all users
var all = require('./all');
users.get('/', all);

// check if word in the database
var read = require('./read');
users.get('/read/:username', read);

// register words in the database
var create = require('./create');
users.post('/create/:user_id/:word', create);

module.exports = users;
