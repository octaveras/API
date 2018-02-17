var database = require('../../db.js');

module.exports = (request, response) => {
	database.getConnection(function(err, connection) {
		if (err) { console.log('error: ', err); response.send(false); connection.release(); return; }
		connection.query('SELECT * from users', function(err, rows) {
			if (err) { console.log('error: ', err); response.send(false); connection.release(); return; }
			response.send(rows);
		});
		connection.release();
	});
};
