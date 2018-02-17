var database = require('../../db.js');

module.exports = (request, response) => {
	database.getConnection(function(err, connection) {
		if (err) { console.log('error: ', err); response.send(false); connection.release(); return; }
			connection.query('SELECT * from words WHERE word = ?', request.params.username,
			function(err, rows) {
				if (err) { console.log('error: ', err); response.send(false); connection.release(); return; }
				if(Object.keys(rows).length) {
					response.send(true);
				}else {
					response.send(false);
				}
			})
			connection.release();
	});
};
