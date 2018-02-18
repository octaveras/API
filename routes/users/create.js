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
				//writehead
				console.log('error: ', err);
				response.send(false);
				connection.release();
				return;
			}
			connection.query('INSERT INTO users (id, name, dow, is_active, alarm_time, notification_time, should_notify, creation_date) VALUES'
			+ '(' + request.params.id + "," + request.params.name + "," + request.params.dow + "," +
			request.params.is_active + "," + request.params.alarm_time + "," + request.params.notification_time
			+ "," + request.params.should_notify + "," + request.params.creation_date + ')',
				function(err) {
					if (err) {
						console.log("3");
						console.log('error: ', err);
						response.send(false);
						connection.rollback();
						connection.release();
						return;
					}
					connection.commit(function(err) {
						if (err) {
							console.log("4");
							onsole.log('error: ', err);
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
