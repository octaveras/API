var mysql = require('mysql');

var db_config = {

};

console.log('Running');

var database = mysql.createPool(db_config);
module.exports = database;
