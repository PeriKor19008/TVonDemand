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

app.get('/films_available', function (req, res) {
  Db.dbConn.query('SELECT film.film_id, film.title FROM film INNER JOIN film_inventory ON film.film_id = film_inventory.film_id', function (error, results, fields) {
      if (error) throw error;
      return res.send({ error, data: results});
  });
});

app.get('/film/:id', function (req, res) {
  let id = Number(req.params.id);
  console.log(req.params.id);
  Db.dbConn.query('SELECT film.film_id, title, description, release_year, language_id, original_language_id, length, rating, special_features, inventory_id FROM film INNER JOIN film_inventory ON film.film_id = film_inventory.film_id WHERE film.film_id = ?',
  id, function (error, results, fields) {
      if (error) throw error;
      return res.send({ error, data: results});
  });
});

app.get('/film/rent/:inventory_id/:customer_id', function (req, res) {
  let inventory_id = Number(req.params.inventory_id);
  let customer_id = Number(req.params.customer_id);
  console.log(req.params.inventory_id);
  console.log(req.params.customer_id);
  Db.dbConn.query('INSERT INTO film_rental(`rental_date`, `inventory_id`, `customer_id`) VALUES (NOW(), ?, ?)',
  [inventory_id, customer_id], function (error, results, fields) {
      if (error) throw error;
      return res.send({ error, data: results});
  });
});

app.get('/film/cart/:id', function (req, res) {
  let id = Number(req.params.id);
  console.log(req.params.id);
  Db.dbConn.query("SELECT film_rental.rental_id, film.title, film_payment.paid, 'film' AS type, film_rental.customer_id FROM film INNER JOIN film_inventory ON film.film_id = film_inventory.film_id INNER JOIN film_rental ON film_inventory.inventory_id = film_rental.inventory_id INNER JOIN film_payment ON film_rental.rental_id = film_payment.rental_id WHERE film_payment.paid = 0 AND film_rental.customer_id = ?",
   id, function (error, results, fields) {
      if (error) throw error;
      return res.send({ error, data: results});
  });
});

app.get('/film/pay/:rental_id', function (req, res) {
  let id = Number(req.params.rental_id);
  console.log(req.params.rental_id);
  Db.dbConn.query("UPDATE film_payment SET paid = 1 WHERE rental_id=?",
   id, function (error, results, fields) {
      if (error) throw error;
      return res.send({ error, data: results});
  });
});

app.get('/language/:language_id', function (req, res) {
  let language_id = Number(req.params.language_id);
  console.log(req.params.language_id);
  Db.dbConn.query("SELECT * FROM language where language_id = ?",
   language_id, function (error, results, fields) {
      if (error) throw error;
      return res.send({ error, data: results});
  });
});

app.get('/series_available', function (req, res) {
  Db.dbConn.query('SELECT serie.serie_id, serie.title FROM serie INNER JOIN season ON serie.serie_id = season.belongs_to INNER JOIN episode ON season.season_id = episode.belongs_to INNER JOIN serie_inventory ON episode.episode_id = serie_inventory.episode_id GROUP BY serie.serie_id', function (error, results, fields) {
      if (error) throw error;
      return res.send({ error, data: results});
  });
});

app.get('/serie/:id', function (req, res) {
  let id = req.params.id;
  console.log(req.params.id);
  Db.dbConn.query('SELECT * FROM serie WHERE serie_id = ?',
  id, function (error, results, fields) {
      if (error) throw error;
      return res.send({ error, data: results});
  });
});

app.get('/seasons_available/:serie_id', function (req, res) {
  let serie_id = Number(req.params.serie_id);
  console.log(req.params.serie_id);
  Db.dbConn.query('SELECT season.season_number, season.no_of_episodes, season.season_id, season.belongs_to FROM season INNER JOIN episode ON season.season_id = episode.belongs_to INNER JOIN serie_inventory ON episode.episode_id = serie_inventory.episode_id GROUP BY season.season_id HAVING season.belongs_to = ?',
    serie_id, function (error, results, fields) {
      if (error) throw error;
      return res.send({ error, data: results});
  });
});

app.get('/episodes_available/:season_id', function (req, res) {
  let season_id = Number(req.params.season_id);
  console.log(req.params.season_id);
  Db.dbConn.query('SELECT episode.episode_id, episode.episode_number, serie_inventory.inventory_id FROM episode INNER JOIN serie_inventory ON episode.episode_id = serie_inventory.episode_id WHERE belongs_to = ?',
    season_id, function (error, results, fields) {
      if (error) throw error;
      return res.send({ error, data: results});
  });
});

app.get('/episode/rent/:inventory_id/:customer_id', function (req, res) {
  let inventory_id = Number(req.params.inventory_id);
  let customer_id = Number(req.params.customer_id);
  console.log(req.params.inventory_id);
  console.log(req.params.customer_id);
  Db.dbConn.query('INSERT INTO serie_rental(`rental_date`, `inventory_id`, `customer_id`) VALUES (NOW(), ?, ?)',
  [inventory_id, customer_id], function (error, results, fields) {
      if (error) throw error;
      return res.send({ error, data: results});
  });
});

app.get('/serie/cart/:id', function (req, res) {
  let id = Number(req.params.id);
  console.log(req.params.id);
  Db.dbConn.query("SELECT serie_rental.rental_id, serie.title, season.season_number, episode.episode_number, serie_payment.paid, 'serie' AS type, serie_rental.customer_id FROM serie INNER JOIN season ON serie.serie_id = season.belongs_to INNER JOIN episode ON season.season_id = episode.belongs_to INNER JOIN serie_inventory ON episode.episode_id = serie_inventory.episode_id INNER JOIN serie_rental ON serie_inventory.inventory_id = serie_rental.inventory_id INNER JOIN serie_payment ON serie_rental.rental_id = serie_payment.rental_id WHERE serie_payment.paid = 0 AND serie_rental.customer_id = ?",
   id, function (error, results, fields) {
      if (error) throw error;
      return res.send({ error, data: results});
  });
});

app.get('/serie/pay/:rental_id', function (req, res) {
  let id = Number(req.params.rental_id);
  console.log(req.params.rental_id);
  Db.dbConn.query("UPDATE serie_payment SET paid = 1 WHERE rental_id=?",
   id, function (error, results, fields) {
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
  console.log(req.params.id);
  Db.dbConn.query("SELECT * FROM customer WHERE customer_id = ?",
  id, function (error, results)
  {
    if(error) throw error;
    return res.send({ data:results });
  });
});

app.get('/profile/customer/address/:id',function (req,res){
  let id = Number(req.params.id);
  console.log(req.params.id);
  Db.dbConn.query("SELECT address.address_id, city.city_id, country.country_id, address.address, address.district, city.city, country.country, address.postal_code FROM customer INNER JOIN address ON customer.address_id = address.address_id INNER JOIN city ON address.city_id = city.city_id INNER JOIN country ON city.country_id = country.country_id WHERE customer.customer_id = ?",
  id, function (error, results)
  {
    if(error) throw error;
    return res.send({ data:results });
  });
});

app.get('/profile/employee/:id',function (req,res){
  let id = Number(req.params.id);
  console.log(req.params.id);
  Db.dbConn.query("SELECT * FROM employee WHERE employee_id = ?",
  id, function (error, results)
  {
    if(error) throw error;
    return res.send({ data:results });
  });
});

app.get('/profile/administrator/:id',function (req,res){
  let id = Number(req.params.id);
  console.log(req.params.id);
  Db.dbConn.query("SELECT * FROM administrator WHERE administrator_id = ?",
  id, function (error, results)
  {
    if(error) throw error;
    return res.send({ data:results });
  });
});

app.get('/get/view_type/:id',function (req,res){
  let id = Number(req.params.id);
  console.log(req.params.id);
  Db.dbConn.query("SELECT view_type FROM customer WHERE customer_id = ?",
  id, function (error, results)
  {
    if(error) throw error;
    return res.send({ data:results });
  });
});