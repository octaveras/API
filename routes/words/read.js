var database = require('../../db.js');

module.exports = (request, response) => {
	database.getConnection(function(err, connection) {
		if (err) {
			console.log('error: ', err);
			response.send(false);
			connection.release();
			return;
		}
			connection.query('SELECT * from words WHERE  user_id= ?', request.params.username,
			function(err, rows) {
				if (err) {
					console.log("1");
					console.log('error: ', err);
					response.send(false);
					connection.release();
					return;
				}
				if(Object.keys(rows).length) {
										console.log("2");
					//console.log(rows[0].id);
					response.writeHead(200, { 'Content-Type': 'text/plain' });
					response.write(JSON.stringify(rows[0]));
					//response.send(true);
					response.end();
				}
				else {
										console.log("3");
					response.send(false);
				}
			})
			connection.end();
	});
};
