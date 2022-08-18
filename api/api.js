var  Db = require('./dboperations');
var  express = require('express');
var  bodyParser = require('body-parser');
var  cors = require('cors');
const {request, response} = require("express");
var  app = express();
var  router = express.Router();

app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

var  port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnning at ' + port);

router.use((request, response, next) => {
    console.log('middleware');
    next();
});

// connection configurations

// connect to database

app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

app.get('/films', function (req, res) {
    Db.dbConn.query('SELECT film_id, title FROM film', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error, data: results});
    });
});

app.get('/film/:id', function (req, res) {
  let id = req.params.id;
  Db.dbConn.query('SELECT * FROM film WHERE film_id = ?',
  id, function (error, results, fields) {
      if (error) throw error;
      return res.send({ error, data: results});
  });
});

app.get('/series', function (req, res) {
    Db.dbConn.query('SELECT serie_id, title FROM serie', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error, data: results});
    });
});

app.get('/login/:email',function (req,res){
  let email=req.params.email;
  console.log(req.params.email);
  Db.dbConn.query("SELECT count(*) AS Found, 'Customer' AS Type, customer_id AS ID FROM customer WHERE email=? UNION SELECT count(*) AS Found, 'Employee' AS Type, employee_id AS ID FROM employee WHERE email=? UNION SELECT count(*) AS Found, 'Administrator' AS Type, administrator_id AS ID FROM administrator WHERE email=? ORDER BY Found DESC LIMIT 0,1",
    [email, email, email], function (error, results, fields){
    if (error) throw error;
    return res.send({ data:results});
  });
});

app.get('/profile/customer/:id',function (req,res){
      let id = Number(req.params.id);
      Db.dbConn.query("SELECT * FROM customer WHERE customer_id = ?",
      id, function (error, results)
      {
        if(error) throw error;
        return res.send({ data:results });
      });
});

app.get('/profile/employee/:id',function (req,res){
      let id = Number(req.params.id);
      Db.dbConn.query("SELECT * FROM employee WHERE employee_id = ?",
      id, function (error, results)
      {
        if(error) throw error;
        return res.send({ data:results });
      });
});

app.get('/profile/administrator/:id',function (req,res){
      let id = Number(req.params.id);
      Db.dbConn.query("SELECT * FROM administrator WHERE administrator_id = ?",
      id, function (error, results)
      {
        if(error) throw error;
        return res.send({ data:results });
      });
});

app.get('/get/view_type/:id',function (req,res){
      let id = Number(req.params.id);
      Db.dbConn.query("SELECT view_type FROM customer WHERE customer_id = ?",
      id, function (error, results)
      {
        if(error) throw error;
        return res.send({ data:results });
      });
});