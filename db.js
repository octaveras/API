var mysql = require('mysql');

var db_config = {
    host: '', //port 3306
    user: '',
    password: '',
    database: '',
};

console.log('Running');

var database = mysql.createPool(db_config);
module.exports = database;
