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
				'INSERT INTO users (`id`, `name`) \
				VALUES (?, ?)', [request.params.user_id, request.params.name],
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
