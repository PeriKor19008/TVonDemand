var  config = require('./dbconfig');
const  mysql = require('mysql');

var dbConn = mysql.createConnection(config);
// connect to database
dbConn.connect();


async  function  getFilms() {
  app.get('/films', function (req, res) {
  con.query('SELECT * FROM users', function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'users list.' });
  });
});
};


module.exports={
  getFilms:getFilms,
  dbConn
}
