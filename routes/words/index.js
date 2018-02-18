var express = require('express');
var words = express.Router();

// get all users
var all = require('./all');
words.get('/', all);

// check if word in the database
var read = require('./read');
words.get('/read/:username', read);

// register words in the database
var create = require('./create');
words.post('/create/:user_id/:word', create);

module.exports = words;
