var database = require('../../db.js');
	module.exports = (request, response) => {

	database.getConnection(function(err, connection) {
		if (err) {
			console.log('error: ', err);
			response.send("false");
			connection.release();
			return;
		}
		connection.beginTransaction(function(err) {
			if (err) {
				console.log('error: ', err);
				response.send(false);
				connection.release();
				return;
			}
			connection.query(
				'UPDATE users\
				 SET `should_inspire` = ?\
				 WHERE `id` = ?', [request.params.dow, request.params.user_id],
			function(err) {
					if (err) {
					console.log('error: ', err);
						response.send(false);
						connection.rollback();
						connection.release();
						return;
					}
					connection.commit(function(err) {
						if (err) {
							console.log('error: ', err);
							response.send(false);
							connection.rollback();
							connection.release();
							return;
						}
						response.send(true);
						connection.end();
					});
				});
		});
	});
};
