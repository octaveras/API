var database = require('../../db.js');

module.exports = (request, response) => {
	database.getConnection(function(err, connection) {
		if (err) { console.log('error: ', err); response.send("false"); connection.release(); return; }
		connection.beginTransaction(function(err) {
			if (err) { console.log('error: ', err); response.send(false); connection.release(); return; }
			connection.query('INSERT INTO users (`username`) VALUES (?)', request.params.username,
				function(err) {
					if (err) { console.log('error: ', err); response.send(false); connection.rollback(); connection.release(); return; }
					connection.commit(function(err) {
						if (err) { console.log('error: ', err); response.send(false); connection.rollback(); connection.release(); return; }
						response.send(true);
						connection.release();
					});
				}
			);
		});
	});
};
