var mysql = require('mysql');

var db_config = {
  host: '',
  port: ,
  user: '',
  password: '',
  database: '',
  connectionLimit :,
};

var database = mysql.createPool(db_config);
module.exports = database;
