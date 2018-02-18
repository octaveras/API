var database = require('../../db.js');

module.exports = (request, response) => {
	database.getConnection(function(err, connection) {
		if (err) {
			console.log('error: ', err);
			response.send(false);
			connection.release();
			return;
		}
    console.log(request.params.user_id);
			connection.query('SELECT word from words WHERE user_id = ? AND creation_date BETWEEN DATE_SUB(NOW(), INTERVAL 30 DAY) AND NOW() order by creation_date',
      request.params.user_id, function(err, rows) {
				if (err) {
					console.log('error: ', err);
					response.send(false);
					connection.release();
					return;
				}
				if(Object.keys(rows).length) {
             console.log(rows);
             response.send(JSON.stringify(rows));
          }
				  else {
					response.send(false);
				}
      })
      connection.end();
		})
	};
