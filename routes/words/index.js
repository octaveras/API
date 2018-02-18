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

//check if word is in database in current date, sends word if so
var check = require('./check');
words.get('/check/:user_id', check);

//send all words for the week
var recap = require('./recap');
words.get('/recap/:user_id', recap);

module.exports = words;
