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
                        var dow_to_set = 0;
                        switch(request.params.dow.toLowerCase()) {
                            case "monday":
                                dow_to_set = 0;
                                break;
                            case "tuesday":
                                dow_to_set = 1;
                                break;
                            case "wednesday":
                                dow_to_set = 2;
                                break;
                            case "thursday":
                                dow_to_set = 3;
                                break;
                            case "friday":
                                dow_to_set = 4;
                                break;
                            case "saturday":
                                dow_to_set = 5;
                                break;
                            case "sunday":
                                dow_to_set = 6;
                                break;
                            default:
                                response.send({"response":false});
                        }
			connection.query(
				'UPDATE users\
				 SET `dow` = ?\
				 WHERE `id` = ?', [dow_to_set, request.params.user_id],
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
