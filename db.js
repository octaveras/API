var mysql = require('mysql');

var db_config = {
  host: 'octavia.c0inkp5ejyyq.us-west-1.rds.amazonaws.com',
  port: 3306,
  user: 'octaviamaster',
  password: 'octaviamasterlnrv',
  database: 'octavia',
};

console.log('Running');

var database = mysql.createPool(db_config);
module.exports = database;
