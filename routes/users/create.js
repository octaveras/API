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
				'INSERT INTO users (`id`, `name`) \
				VALUES (?, ?)', [request.params.user_id, request.params.name],
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
