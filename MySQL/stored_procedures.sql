--
-- Stored procedure to show n most rented movies/series in a specific timeframe
--

DROP PROCEDURE IF EXISTS show_top_movies_or_series_in_timeframe;
DELIMITER $
CREATE PROCEDURE show_top_movies_or_series_in_timeframe(IN mors CHAR, IN num INT, IN date1 DATE, IN date2 DATE)
BEGIN 
CASE (mors)
	WHEN 'm' THEN
		SELECT film.title, film.film_id AS id, COUNT(film_rental.inventory_id) AS count
		FROM film
		INNER JOIN film_inventory ON film.film_id = film_inventory.film_id
		INNER JOIN film_rental ON film_inventory.inventory_id = film_rental.inventory_id
		WHERE film_rental.rental_date BETWEEN DATE_SUB(date1, INTERVAL 1 DAY) AND DATE_ADD(date2, INTERVAL 1 DAY)
		GROUP BY film.title
		ORDER BY COUNT(film_rental.inventory_id) DESC LIMIT num;
	WHEN 's' THEN
		SELECT serie.title, serie.serie_id AS id, COUNT(serie_rental.inventory_id) AS count
		FROM serie
		INNER JOIN season ON season.belongs_to = serie.serie_id
		INNER JOIN episode ON episode.belongs_to = season.season_id
		INNER JOIN serie_inventory ON serie_inventory.episode_id = episode.episode_id
		INNER JOIN serie_rental ON serie_rental.inventory_id = serie_inventory.inventory_id
		WHERE serie_rental.rental_date BETWEEN date1 AND date2
		GROUP BY serie.title
		ORDER BY COUNT(serie_rental.inventory_id) DESC LIMIT num;
	ELSE
		SELECT 'Wrong input';
END CASE;
END$
DELIMITER ;


-- 
-- Stored procedure to show the number of rentals of a specific customer in a day (used in triggers)
--

DROP PROCEDURE IF EXISTS number_of_rentals_for_customer_in_day;
DELIMITER $
CREATE PROCEDURE number_of_rentals_for_customer_in_day(IN email VARCHAR(45), IN date1 DATE, OUT film_num SMALLINT, OUT serie_num SMALLINT)
BEGIN
	SELECT COUNT(film_rental.customer_id) 
	FROM customer
	INNER JOIN film_rental ON customer.customer_id = film_rental.customer_id
	WHERE customer.email = email
	AND film_rental.rental_date LIKE CONCAT('%',date1,'%')
	INTO film_num;
	SELECT COUNT(serie_rental.customer_id) 
	FROM customer
	INNER JOIN serie_rental ON customer.customer_id = serie_rental.customer_id
	WHERE customer.email = email
	AND serie_rental.rental_date LIKE CONCAT('%',date1,'%')
	INTO serie_num;
END$
DELIMITER ;


-- 
-- Stored procedure to show the number of rentals of a specific customer in a day according to view_type
--

DROP PROCEDURE IF EXISTS show_number_of_rentals_for_customer_in_day;
DELIMITER $
CREATE PROCEDURE show_number_of_rentals_for_customer_in_day(IN email VARCHAR(45), IN date1 DATE)
BEGIN
	DECLARE temp1 SMALLINT;
	DECLARE temp2 SMALLINT;
	DECLARE subscription ENUM('Films', 'Series', 'Both');
	CALL number_of_rentals_for_customer_in_day(email, date1, temp1, temp2);
	SELECT view_type INTO subscription FROM customer WHERE customer.email = email;
	CASE (subscription)
		WHEN 'Films' THEN
			SELECT temp1 AS MoviesRentedInADay;
		WHEN 'Series' THEN
			SELECT temp2 AS SeriesEpisodesRentedInADay;
		WHEN 'Both' THEN
			SELECT temp1 AS MoviesRentedInADay, temp2 AS SeriesEpisodesRentedInADay;
	END CASE;
END$
DELIMITER ;


-- 
-- Stored Procedure to show income by month
--

DROP PROCEDURE IF EXISTS show_income_by_month;
DELIMITER $
CREATE PROCEDURE show_income_by_month()
BEGIN
	DECLARE count INT;
	DECLARE curyear INT;
	DECLARE minyear INT;
	DECLARE maxyear INT;
	DECLARE temp1 DATETIME;
	DECLARE temp2 DATETIME;
	SELECT MIN(payment_date)
	INTO temp1
	FROM film_payment;
	SELECT MIN(payment_date)
	INTO temp2
	FROM serie_payment;
	IF (temp1 < temp2) THEN
		SET minyear = YEAR(temp1);
	ELSE
		SET minyear = YEAR(temp2);
	END IF;
	SELECT MAX(payment_date)
	INTO temp1
	FROM film_payment;
	SELECT MAX(payment_date)
	INTO temp2
	FROM serie_payment;
	IF (temp1 > temp2) THEN
		SET maxyear = YEAR(temp1);
	ELSE
		SET maxyear = YEAR(temp2);
	END IF;
	SET curyear = minyear;
	WHILE (curyear <= maxyear) DO
		SET count = 1;
		WHILE (count<=12) DO
			SELECT curyear AS Year, count AS Month;
			SELECT SUM(amount) AS Films_Income
			FROM film_payment
			WHERE MONTH(payment_date) = count
			AND YEAR(payment_date) = curyear;
			SELECT SUM(amount) AS Series_Income
			FROM serie_payment
			WHERE MONTH(payment_date) = count
			AND YEAR(payment_date) = curyear;
			SET count = count + 1;
		END WHILE;
		SET curyear = curyear + 1;
	END WHILE;
END$
DELIMITER ;


--
-- Stored Procedure to show actors in alphabetical range of surnames
--

DROP PROCEDURE IF EXISTS actors_in_3_digit_alphabetical_range;
DELIMITER $
CREATE PROCEDURE actors_in_3_digit_alphabetical_range(IN name1 VARCHAR(10), IN name2 VARCHAR(10))
BEGIN
	SELECT * FROM actor FORCE INDEX(last_name_actor_desc)
	WHERE last_name BETWEEN CONCAT(name1,'%') AND CONCAT(name2,'%')
	OR last_name LIKE CONCAT(name2,'%')
	ORDER BY last_name;
END$
DELIMITER ;


--
-- Stored Procedure to show actors with specific surname
--

DROP PROCEDURE IF EXISTS actors_with_specific_last_name;
DELIMITER $
CREATE PROCEDURE actors_with_specific_last_name(IN name3 VARCHAR(30))
BEGIN
	SELECT last_name, first_name, COUNT(last_name) FROM actor FORCE INDEX(last_name_actor_desc)
	WHERE last_name = name3;
END$
DELIMITER ;