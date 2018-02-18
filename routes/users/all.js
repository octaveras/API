var database = require('../../db.js');
module.exports = (request, response) => {
	database.getConnection(function(err, connection) {
		if (err) {
			console.log('error: ', err);
			response.send(false);
			connection.release();
			return;
		}
		connection.query('SELECT * from users', function(err, rows) {
			if (err) {
				console.log('error: ', err);
				response.send(false);
				connection.release();
				return;
			}
			response.writeHead(200, { 'Content-Type': 'text/plain' });
			response.write(JSON.stringify(rows));
			response.end(); //sends the JSON also
		});
		connection.end();
	});
};
