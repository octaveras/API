var express = require("express");
var app = express();
var database = require('./db.js');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var routes = require('./routes');
app.use('/', routes);

var port = process.env.PORT || 3306;
app.listen(port, function() {
  console.log("Listening on " + port);
});
