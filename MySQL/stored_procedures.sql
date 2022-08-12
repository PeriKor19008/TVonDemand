--
-- Stored procedure to show n most rented movies/series in a specific timeframe
--

DROP PROCEDURE IF EXISTS show_top_movies_or_series_in_timeframe;
DELIMITER $
CREATE PROCEDURE show_top_movies_or_series_in_timeframe(IN mors CHAR, IN num INT, IN date1 DATE, IN date2 DATE)
BEGIN 
CASE (mors)
	WHEN 'm' THEN
		SELECT film.title, film.film_id, COUNT(film_rental.inventory_id)
		FROM film
		INNER JOIN film_inventory ON film.film_id = film_inventory.film_id
		INNER JOIN film_rental ON film_inventory.inventory_id = film_rental.inventory_id
		WHERE film_rental.rental_date BETWEEN date1 AND date2
		GROUP BY film.title
		ORDER BY COUNT(film_rental.inventory_id) DESC LIMIT num;
	WHEN 's' THEN
		SELECT serie.title, serie.serie_id, COUNT(serie_rental.inventory_id)
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
-- Stored procedure to show the number of rentals of a specific customer in a day
--

DROP PROCEDURE IF EXISTS number_of_rentals_for_customer_in_day;
DELIMITER $
CREATE PROCEDURE number_of_rentals_for_customer_in_day(IN email VARCHAR(45), IN date3 DATE)
BEGIN
	DECLARE temp1 SMALLINT UNSIGNED;
	DECLARE temp2 SMALLINT UNSIGNED;
	SELECT COUNT(film_rental.customer_id) 
	FROM customer
	INNER JOIN film_rental ON customer.customer_id = film_rental.customer_id
	WHERE customer.email = email
	AND film_rental.rental_date LIKE CONCAT('%',date3,'%')
	INTO temp1;
	SELECT COUNT(serie_rental.customer_id) 
	FROM customer
	INNER JOIN serie_rental ON customer.customer_id = serie_rental.customer_id
	WHERE customer.email = email
	AND serie_rental.rental_date LIKE CONCAT('%',date3,'%')
	INTO temp2;
	SELECT temp1 AS 'Movies Rented That Day', temp2 AS 'Series Rented That Day';
END$
delimiter ;
