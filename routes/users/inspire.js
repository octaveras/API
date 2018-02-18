var database = require('../../db.js');
	module.exports = (request, response) => {

	database.getConnection(function(err, connection) {
		if (err) {
			console.log("1");
			console.log('error: ', err);
			response.send("false");
			connection.release();
			return;
		}
		connection.beginTransaction(function(err) {
			if (err) {
				console.log("2");
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
						console.log("3");
					console.log('error: ', err);
						response.send(false);
						connection.rollback();
						connection.release();
						return;
					}
					console.log("3 success");
					connection.commit(function(err) {
						if (err) {
							console.log("4");
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
