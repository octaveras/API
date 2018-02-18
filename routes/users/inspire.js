var database = require('../../db.js');
	module.exports = (request, response) => {

	database.getConnection(function(err, connection) {
		if (err) {
			console.log('error: ', err);
			response.send({"response":false});
			connection.release();
			return;
		}
		connection.beginTransaction(function(err) {
			if (err) {
				console.log('error: ', err);
				response.send({"response":false});
				connection.release();
				return;
			}
			connection.query(
				'UPDATE users\
				 SET `should_inspire` = ?\
				 WHERE `id` = ?', [request.params.should_inspire, request.params.user_id],
			function(err) {
					if (err) {
					console.log('error: ', err);
						response.send({"response":false});
						connection.rollback();
						connection.release();
						return;
					}
					connection.commit(function(err) {
						if (err) {
							console.log('error: ', err);
							response.send({"response":false});
							connection.rollback();
							connection.release();
							return;
						}
						response.send({"response":true});
						connection.end();
					});
				});
		});
	});
};
