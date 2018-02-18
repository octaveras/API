var database = require('../../db.js');

module.exports = (request, response) => {
	database.getConnection(function(err, connection) {
    console.log("databse get connection");
		if (err) {
			console.log('error: ', err);
			response.send(false);
			connection.release();
			return;
		}
			connection.query('SELECT * from words WHERE user_id = ? order by creation_date desc', request.params.user_id,
			function(err, rows) {
        console.log("connection.query");
				if (err) {
          console.log("error 1");
					console.log('error: ', err);
					response.send(false);
					connection.release();
					return;
				}

				if(Object.keys(rows).length) {
          console.log("key exists");
          var todaysDate = new Date();
          var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          var yearToday = todaysDate.getFullYear();
          var monthToday = months[todaysDate.getMonth()];
          var dateToday = todaysDate.getDate();
          var timeToday = date + ' ' + month + ' ' + year ;

          var year = rows[0].creation_date.getFullYear();
          var month = months[rows[0].creation_date.getMonth()];
          var date = rows[0].creation_date.getDate();
          var timeCurr = date + ' ' + month + ' ' + year ;

           if(todaysDate.setHours(0,0,0,0) == rows[0].creation_date.setHours(0,0,0,0)){
             console.log("they are equal. send word");
             console.log(rows[0].word);
             response.send(rows[0].word);
             response.end();
           }
           else{
					   response.writeHead(200, { 'Content-Type': 'text/plain' });
					   response.write(JSON.stringify(rows[0]));
             response.send(false);
					   response.end();
          }
				}
				else {
                    console.log("error else");
					response.send(false);
				}
			})
			connection.end();
	});
};
