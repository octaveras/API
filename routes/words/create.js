var database = require('../../db.js');

module.exports = (request, response) => {
	database.getConnection(function(err, connection) {
		if (err) { console.log('error: ', err); response.send("false"); connection.release(); return; }
		connection.beginTransaction(function(err) {
			if (err) { console.log('error: ', err); response.send(false); connection.release(); return; }
			connection.query('INSERT INTO words (`word`) VALUES (?)', request.params.username, //('words') ?
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
