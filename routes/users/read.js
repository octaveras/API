var database = require('../../db.js');
module.exports = (request, response) => {
	database.getConnection(function(err, connection) {
		if (err) {
			console.log('error: ', err);
			response.send(false);
			connection.release();
			return;
		}
		connection.query('SELECT * from users WHERE id= ?', request.params.user_id,
			function(err, rows) {
				if (err) {
					response.send(false);
					connection.release();
					return;
				}
				if(Object.keys(rows).length) {
					response.writeHead(200, { 'Content-Type': 'text/plain' });
					response.write(JSON.stringify(rows[0]));
					response.end();

				}
				else {
					response.send(false);
				}
			})
			connection.end();
	});
};
