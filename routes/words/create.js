var database = require('../../db.js');

module.exports = (request, response) => {
	database.getConnection(function(err, connection) {
		if (err) {
			console.log("1 word");
			 console.log('error: ', err);
			 response.send("false");
			 connection.release(); return;
		}
		connection.beginTransaction(function(err) {
			if (err) {
				console.log("2 word");
				console.log('error: ', err);
				response.send(false); connection.release();
				return;
			}

			connection.query(
							'INSERT INTO words (`user_id`, `word`) VALUES (?, ?)', [request.params.user_id, request.params.word],
						function(err) {
					if (err) {
						console.log("3 word");
						console.log('error: ', err);
						response.send(false);
						connection.rollback();
						connection.release();
						return;
					}
					connection.commit(function(err) {
						if (err) {
							console.log("4 word");
							console.log('error: ', err);
							response.send(false);
							connection.rollback();
							connection.release();
							return;
						}
						response.send(true);
						connection.end();
					});
				}
			);
		});
	});
};
