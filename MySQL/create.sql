--
-- Initialization of database
--

--DROP SCHEMA IF EXISTS tvondemand;
--CREATE SCHEMA tvondemand;
--USE tvondemand;


--
-- Table structure for table `actor`
--

DROP TABLE IF EXISTS actor;
CREATE TABLE actor (
  actor_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(45) NOT NULL,
  last_name VARCHAR(45) NOT NULL,
  PRIMARY KEY  (actor_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS country;
CREATE TABLE country (
  country_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  country VARCHAR(50) NOT NULL,
  PRIMARY KEY  (country_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS city;
CREATE TABLE city (
  city_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  city VARCHAR(50) NOT NULL,
  country_id SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY  (city_id),
  CONSTRAINT `fk_city_country` FOREIGN KEY (country_id) REFERENCES country (country_id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS address;
CREATE TABLE address (
  address_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  address VARCHAR(50) NOT NULL,
  district VARCHAR(20) DEFAULT NULL,
  city_id SMALLINT UNSIGNED NOT NULL,
  postal_code VARCHAR(10) DEFAULT NULL,
  phone VARCHAR(20) NOT NULL,
  PRIMARY KEY  (address_id),
  CONSTRAINT `fk_address_city` FOREIGN KEY (city_id) REFERENCES city (city_id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS category;
CREATE TABLE category (
  category_id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(25) NOT NULL,
  PRIMARY KEY  (category_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `language`
--

DROP TABLE IF EXISTS language;
CREATE TABLE language (
  language_id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name CHAR(20) NOT NULL,
  PRIMARY KEY (language_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS customer;
CREATE TABLE customer (
  customer_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(45) NOT NULL,
  last_name VARCHAR(45) NOT NULL,
  email VARCHAR(50) NOT NULL,
  address_id SMALLINT UNSIGNED NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  create_date DATETIME NOT NULL,
  view_type ENUM('Films', 'Series', 'Both') DEFAULT 'Both' NOT NULL,
  PRIMARY KEY  (customer_id),
  CONSTRAINT fk_customer_address FOREIGN KEY (address_id) REFERENCES address (address_id) ON DELETE RESTRICT ON UPDATE CASCADE
  )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `film`
--

DROP TABLE IF EXISTS film;
CREATE TABLE film (
  film_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(128) NOT NULL,
  description TEXT DEFAULT NULL,
  release_year YEAR DEFAULT NULL,
  language_id TINYINT UNSIGNED NOT NULL,
  original_language_id TINYINT UNSIGNED DEFAULT NULL,
  length SMALLINT UNSIGNED DEFAULT NULL,
  rating ENUM('G','PG','PG-13','R','NC-17') DEFAULT 'G',
  special_features SET('Trailers','Commentaries','Deleted Scenes','Behind the Scenes') DEFAULT NULL,
  PRIMARY KEY  (film_id),
  CONSTRAINT fk_film_language FOREIGN KEY (language_id) REFERENCES language (language_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_film_language_original FOREIGN KEY (original_language_id) REFERENCES language (language_id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `film_actor`
--

DROP TABLE IF EXISTS film_actor;
CREATE TABLE film_actor (
  actor_id SMALLINT UNSIGNED NOT NULL,
  film_id SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY  (actor_id,film_id),
  CONSTRAINT fk_film_actor_actor FOREIGN KEY (actor_id) REFERENCES actor (actor_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_film_actor_film FOREIGN KEY (film_id) REFERENCES film (film_id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `film_category`
--

DROP TABLE IF EXISTS film_category;
CREATE TABLE film_category (
  film_id SMALLINT UNSIGNED NOT NULL,
  category_id TINYINT UNSIGNED NOT NULL,
  PRIMARY KEY (film_id, category_id),
  CONSTRAINT fk_film_category_film FOREIGN KEY (film_id) REFERENCES film (film_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_film_category_category FOREIGN KEY (category_id) REFERENCES category (category_id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `film_inventory`
--

DROP TABLE IF EXISTS film_inventory;
CREATE TABLE film_inventory (
  inventory_id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
  film_id SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY  (inventory_id),
  CONSTRAINT fk_inventory_film FOREIGN KEY (film_id) REFERENCES film (film_id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `film_rental`
--

DROP TABLE IF EXISTS film_rental;
CREATE TABLE film_rental (
  rental_id INT NOT NULL AUTO_INCREMENT,
  rental_date DATETIME NOT NULL,
  inventory_id MEDIUMINT UNSIGNED NOT NULL,
  customer_id SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (rental_id),
  UNIQUE KEY  (rental_date,inventory_id,customer_id),
  CONSTRAINT fk_film_rental_inventory FOREIGN KEY (inventory_id) REFERENCES film_inventory (inventory_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_film_rental_customer FOREIGN KEY (customer_id) REFERENCES customer (customer_id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `film_payment`
--

DROP TABLE IF EXISTS film_payment;
CREATE TABLE film_payment (
  payment_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  customer_id SMALLINT UNSIGNED NOT NULL,
  rental_id INT DEFAULT NULL,
  amount DECIMAL(5,2) NOT NULL DEFAULT 0.4,
  payment_date DATETIME NOT NULL,
  paid BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY  (payment_id),
  CONSTRAINT fk_flim_payment_rental FOREIGN KEY (rental_id) REFERENCES film_rental (rental_id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_film_payment_customer FOREIGN KEY (customer_id) REFERENCES customer (customer_id) ON DELETE RESTRICT ON UPDATE CASCADE
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table 'employee'
--

DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
  employee_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(45) NOT NULL,
  last_name VARCHAR(45) NOT NULL,
  email VARCHAR(50) NOT NULL,
  address_id SMALLINT UNSIGNED NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  create_date DATETIME NOT NULL,
  PRIMARY KEY  (employee_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table 'administrator'
--

DROP TABLE IF EXISTS administrator;
CREATE TABLE administrator (
  administrator_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(45) NOT NULL,
  last_name VARCHAR(45) NOT NULL,
  email VARCHAR(50) NOT NULL,
  address_id SMALLINT UNSIGNED NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  create_date DATETIME NOT NULL,
  PRIMARY KEY  (administrator_id)
  )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table 'serie'
--

DROP TABLE IF EXISTS serie;
CREATE TABLE serie (
  serie_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(128) NOT NULL,
  description TEXT DEFAULT NULL,
  release_year YEAR DEFAULT NULL,
  language_id TINYINT UNSIGNED NOT NULL,
  original_language_id TINYINT UNSIGNED DEFAULT NULL,
  rating ENUM('G','PG','PG-13','R','NC-17') DEFAULT 'G',
  special_features SET('Trailers','Commentaries','Deleted Scenes','Behind the Scenes') DEFAULT NULL,
  no_of_seasons SMALLINT UNSIGNED DEFAULT 0 NOT NULL, -- Trigger to increment it on season creation
  PRIMARY KEY  (serie_id),
  CONSTRAINT fk_serie_language FOREIGN KEY (language_id) REFERENCES language (language_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_serie_language_original FOREIGN KEY (original_language_id) REFERENCES language (language_id) ON DELETE RESTRICT ON UPDATE CASCADE
  )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for 'season'
--

DROP TABLE IF EXISTS season;
CREATE TABLE season (
  season_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  season_number SMALLINT UNSIGNED NOT NULL,
  no_of_episodes SMALLINT UNSIGNED NOT NULL,
  belongs_to SMALLINT UNSIGNED DEFAULT 0 NOT NULL,
  PRIMARY KEY (season_id),
  CONSTRAINT fk_season_id FOREIGN KEY (belongs_to) REFERENCES serie (serie_id) ON DELETE CASCADE ON UPDATE CASCADE
  )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for 'season'
--

DROP TABLE IF EXISTS episode;
CREATE TABLE episode (
  episode_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  episode_number SMALLINT UNSIGNED NOT NULL,
  belongs_to SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (episode_id),
  CONSTRAINT fk_episode_id FOREIGN KEY (belongs_to) REFERENCES season (season_id) ON DELETE CASCADE ON UPDATE CASCADE
  )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `serie_actor`
--

DROP TABLE IF EXISTS serie_actor;
CREATE TABLE serie_actor (
  actor_id SMALLINT UNSIGNED NOT NULL,
  serie_id SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY  (actor_id,serie_id),
  CONSTRAINT fk_serie_actor_actor FOREIGN KEY (actor_id) REFERENCES actor (actor_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_serie_actor_serie FOREIGN KEY (serie_id) REFERENCES serie (serie_id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `serie_category`
--

DROP TABLE IF EXISTS serie_category;
CREATE TABLE serie_category (
  serie_id SMALLINT UNSIGNED NOT NULL,
  category_id TINYINT UNSIGNED NOT NULL,
  PRIMARY KEY (serie_id, category_id),
  CONSTRAINT fk_serie_category_serie FOREIGN KEY (serie_id) REFERENCES serie (serie_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_serie_category_category FOREIGN KEY (category_id) REFERENCES category (category_id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `serie_inventory`
--

DROP TABLE IF EXISTS serie_inventory;
CREATE TABLE serie_inventory (
  inventory_id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
  episode_id SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY  (inventory_id),
  CONSTRAINT fk_inventory_episode FOREIGN KEY (episode_id) REFERENCES episode (episode_id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `serie_rental`
--

DROP TABLE IF EXISTS serie_rental;
CREATE TABLE serie_rental (
  rental_id INT NOT NULL AUTO_INCREMENT,
  rental_date DATETIME NOT NULL,
  inventory_id MEDIUMINT UNSIGNED NOT NULL,
  customer_id SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (rental_id),
  UNIQUE KEY  (rental_date,inventory_id,customer_id),
  CONSTRAINT fk_serie_rental_inventory FOREIGN KEY (inventory_id) REFERENCES serie_inventory (inventory_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_serie_rental_customer FOREIGN KEY (customer_id) REFERENCES customer (customer_id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `serie_payment`
--

DROP TABLE IF EXISTS serie_payment;
CREATE TABLE serie_payment (
  payment_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  customer_id SMALLINT UNSIGNED NOT NULL,
  rental_id INT DEFAULT NULL,
  amount DECIMAL(5,2) NOT NULL DEFAULT 0.2,
  payment_date DATETIME NOT NULL,
  paid BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY  (payment_id),
  CONSTRAINT fk_serie_payment_rental FOREIGN KEY (rental_id) REFERENCES serie_rental (rental_id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_serie_payment_customer FOREIGN KEY (customer_id) REFERENCES customer (customer_id) ON DELETE RESTRICT ON UPDATE CASCADE
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `log`
--

DROP TABLE IF EXISTS log;
CREATE TABLE log (
  log_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_email VARCHAR(50) NOT NULL,
  user_type ENUM('Customer', 'Employee', 'Administrator') NOT NULL,
  action ENUM('Insert', 'Update', 'DELETE') NOT NULL,
  target VARCHAR(50) NOT NULL,
  action_date DATETIME NOT NULL,
  applied BOOLEAN NOT NULL,
  PRIMARY KEY (log_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table 'price'
--

DROP TABLE IF EXISTS price;
CREATE TABLE price (
  price_entry VARCHAR(50) NOT NULL,
  amount DECIMAL(5,2) NOT NULL ,
  PRIMARY KEY (price_entry)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
