--
-- Trigger to update no_of_seasons on all series after adding new seasons to season table
--

DROP TRIGGER IF EXISTS season_no_incrementer;
DELIMITER $
CREATE TRIGGER season_no_incrementer
  AFTER INSERT ON season
  FOR EACH ROW
  BEGIN
    DECLARE sid SMALLINT;
    DECLARE no SMALLINT;
    DECLARE finishedFLag INT;
    DECLARE cursor1 CURSOR FOR SELECT belongs_to FROM season;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET finishedFlag = 1;
    OPEN cursor1;
    SET finishedFlag = 0;
    REPEAT
      FETCH cursor1 INTO sid;
      SELECT count(*) INTO @no FROM serie LEFT JOIN season ON serie.serie_id = season.belongs_to GROUP BY serie.serie_id HAVING serie.serie_id = sid;
      UPDATE serie SET no_of_seasons = @no WHERE serie.serie_id = sid;
    UNTIL (finishedFlag = 1)
    END REPEAT;
    CLOSE cursor1;
  END$
DELIMITER ;


--
-- Trigger to update episode_no on all seasons after adding new episodes to episode table
--

DROP TRIGGER IF EXISTS episode_no_incrementer;
DELIMITER $
CREATE TRIGGER episode_no_incrementer
  AFTER INSERT ON episode
  FOR EACH ROW
  BEGIN
    DECLARE sid SMALLINT;
    DECLARE no SMALLINT;
    DECLARE finishedFLag INT;
    DECLARE cursor1 CURSOR FOR SELECT belongs_to FROM episode;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET finishedFlag = 1;
    OPEN cursor1;
    SET finishedFlag = 0;
    REPEAT
      FETCH cursor1 INTO sid;
      SELECT count(*) INTO @no FROM season LEFT JOIN episode ON season.season_id = episode.belongs_to GROUP BY season.season_id HAVING season.season_id = sid;
      UPDATE season SET no_of_episodes = @no WHERE season.season_id = sid;
    UNTIL (finishedFlag = 1)
    END REPEAT;
    CLOSE cursor1;
  END$
DELIMITER ;


--
-- Trigger to check that email is unique for all user types on every insertion on customer
--

DROP TRIGGER IF EXISTS unique_email_checker_customer;
DELIMITER $
CREATE TRIGGER unique_email_checker_customer
  BEFORE INSERT ON customer
  FOR EACH ROW
  BEGIN
    DECLARE temp_email VARCHAR(50);
    SELECT email FROM customer WHERE email=NEW.email UNION
    SELECT email FROM employee WHERE email=NEW.email UNION
    SELECT email FROM administrator WHERE email=NEW.email
    INTO temp_email;
    IF (temp_email IS NOT NULL) THEN
      SIGNAL SQLSTATE VALUE '45000'
      SET MESSAGE_TEXT = 'Invalid Operation! User with the same email already exists!'; 
    END IF;
  END$ 
DELIMITER ;


--
-- Trigger to check that email is unique for all user types on every insertion on employee
--

DROP TRIGGER IF EXISTS unique_email_checker_employee;
DELIMITER $
CREATE TRIGGER unique_email_checker_employee
  BEFORE INSERT ON employee
  FOR EACH ROW
  BEGIN
    DECLARE temp_email VARCHAR(50);
    SELECT email FROM customer WHERE email=NEW.email UNION
    SELECT email FROM employee WHERE email=NEW.email UNION
    SELECT email FROM administrator WHERE email=NEW.email
    INTO temp_email;
    IF (temp_email IS NOT NULL) THEN
      SIGNAL SQLSTATE VALUE '45000'
      SET MESSAGE_TEXT = 'Invalid Operation! User with the same email already exists!'; 
    END IF;
  END$ 
DELIMITER ;


--
-- Trigger to check that email is unique for all user types on every insertion on administrator
--

DROP TRIGGER IF EXISTS unique_email_checker_administrator;
DELIMITER $
CREATE TRIGGER unique_email_checker_administrator
  BEFORE INSERT ON administrator
  FOR EACH ROW
  BEGIN
    DECLARE temp_email VARCHAR(50);
    SELECT email FROM customer WHERE email=NEW.email UNION
    SELECT email FROM employee WHERE email=NEW.email UNION
    SELECT email FROM administrator WHERE email=NEW.email
    INTO temp_email;
    IF (temp_email IS NOT NULL) THEN
      SIGNAL SQLSTATE VALUE '45000'
      SET MESSAGE_TEXT = 'Invalid Operation! User with the same email already exists!'; 
    END IF;
  END$ 
DELIMITER ;


--
-- Trigger to update log table on insert on film_rental and create film_payment with possible discounts
--

DROP TRIGGER IF EXISTS log_insert_film_rental_and_create_payment_with_discounts;
DELIMITER $
CREATE TRIGGER log_insert_film_rental_and_create_payment_with_discounts
  AFTER INSERT ON film_rental
  FOR EACH ROW
  BEGIN
    DECLARE temp_email VARCHAR(50);
    DECLARE temp_rental_date DATETIME;
    DECLARE temp_view_type ENUM('Films', 'Series', 'Both');
    DECLARE film_num SMALLINT;
    DECLARE serie_num SMALLINT;
    DECLARE temp_amount DECIMAL(5,2);
    SELECT email, view_type INTO temp_email, temp_view_type FROM customer WHERE customer_id = NEW.customer_id;
    INSERT INTO `log` (`user_email`, `user_type`, `action`, `target`, `action_date`, `applied`) VALUES
    (temp_email, 'Customer', 'Insert', 'Film Rental', NEW.rental_date, 1);
    SELECT amount FROM price WHERE price_entry = 'film' INTO temp_amount;
    IF (temp_view_type = 'Both') THEN
      SELECT amount FROM price WHERE price_entry = 'film_both' INTO temp_amount;
    END IF;
    CALL number_of_rentals_for_customer_in_day(temp_email, CAST(NEW.rental_date AS Date), film_num, serie_num);
    IF (MOD(film_num, 3) = 0) THEN
	  SET temp_amount = temp_amount * 0.5;
    END IF;
    INSERT INTO `film_payment` (`payment_id`, `customer_id`, `rental_id`, `amount`, `payment_date`)
    VALUES (NULL, NEW.customer_id, NEW.rental_id, temp_amount, NEW.rental_date);
  END$
DELIMITER ;


--
-- Trigger to update log table on insert on serie_rental and create serie_payment with possible discounts
--

DROP TRIGGER IF EXISTS log_insert_serie_rental_and_create_payment_with_discounts;
DELIMITER $
CREATE TRIGGER log_insert_serie_rental_and_create_payment_with_discounts
  AFTER INSERT ON serie_rental
  FOR EACH ROW
  BEGIN
    DECLARE temp_email VARCHAR(50);
    DECLARE temp_rental_date DATETIME;
    DECLARE temp_view_type ENUM('Films', 'Series', 'Both');
    DECLARE film_num SMALLINT;
    DECLARE serie_num SMALLINT;
    DECLARE temp_amount DECIMAL(5,2);
    SELECT email, view_type INTO temp_email, temp_view_type FROM customer WHERE customer_id = NEW.customer_id;
    INSERT INTO `log` (`user_email`, `user_type`, `action`, `target`, `action_date`, `applied`) VALUES
    (temp_email, 'Customer', 'Insert', 'Serie Rental', NEW.rental_date, 1);
    SELECT amount FROM price WHERE price_entry = 'serie' INTO temp_amount;
    IF (temp_view_type = 'Both') THEN
      SELECT amount FROM price WHERE price_entry = 'serie_both' INTO temp_amount;
    END IF;
    CALL number_of_rentals_for_customer_in_day(temp_email, CAST(NEW.rental_date AS Date), film_num, serie_num);
    IF (MOD(serie_num, 3) = 0) THEN
	  SET temp_amount = temp_amount * 0.5;
    END IF;
    INSERT INTO `serie_payment` (`payment_id`, `customer_id`, `rental_id`, `amount`, `payment_date`)
    VALUES (NULL, NEW.customer_id, NEW.rental_id, temp_amount, NEW.rental_date);
  END$
DELIMITER ;


--
-- Trigger to update log table on update on serie_rental
--

DROP TRIGGER IF EXISTS log_update_serie_rental;
DELIMITER $
CREATE TRIGGER log_update_serie_rental
  AFTER UPDATE ON serie_rental
  FOR EACH ROW
  BEGIN
    DECLARE temp_email VARCHAR(50);
    DECLARE temp_rental_date DATETIME;
    SELECT customer.email, serie_rental.rental_date INTO temp_email, temp_rental_date FROM serie_rental INNER JOIN customer ON serie_rental.customer_id = customer.customer_id WHERE serie_rental.rental_id= NEW.rental_id;
    INSERT INTO `log` (`user_email`, `user_type`, `action`, `target`, `action_date`, `applied`) VALUES
    (temp_email, 'Customer', 'Update', 'Serie Rental', temp_rental_date, 1);
  END$
DELIMITER ;


--
-- Trigger to update log table on update on film_rental
--

DROP TRIGGER IF EXISTS log_update_film_rental;
DELIMITER $
CREATE TRIGGER log_update_film_rental
  AFTER UPDATE ON film_rental
  FOR EACH ROW
  BEGIN
    DECLARE temp_email VARCHAR(50);
    DECLARE temp_rental_date DATETIME;
    SELECT customer.email, film_rental.rental_date INTO temp_email, temp_rental_date FROM film_rental INNER JOIN customer ON film_rental.customer_id = customer.customer_id WHERE film_rental.rental_id= NEW.rental_id;
    INSERT INTO `log` (`user_email`, `user_type`, `action`, `target`, `action_date`, `applied`) VALUES
    (temp_email, 'Customer', 'Update', 'Film Rental', temp_rental_date, 1);
  END$
DELIMITER ;


--
-- Trigger to update log table on delete on serie_rental
--

DROP TRIGGER IF EXISTS log_delete_serie_rental;
DELIMITER $
CREATE TRIGGER log_delete_serie_rental
  AFTER DELETE ON serie_rental
  FOR EACH ROW
  BEGIN
    DECLARE temp_email VARCHAR(50);
    DECLARE temp_rental_date DATETIME;
    SELECT customer.email, serie_rental.rental_date INTO temp_email, temp_rental_date FROM serie_rental INNER JOIN customer ON serie_rental.customer_id = customer.customer_id WHERE serie_rental.rental_id= OLD.rental_id;
    INSERT INTO `log` (`user_email`, `user_type`, `action`, `target`, `action_date`, `applied`) VALUES
    (temp_email, 'Customer', 'Delete', 'Serie Rental', temp_rental_date, 1);
  END$
DELIMITER ;


--
-- Trigger to update log table on delete on film_rental
--

DROP TRIGGER IF EXISTS log_delete_film_rental;
DELIMITER $
CREATE TRIGGER log_delete_film_rental
  AFTER DELETE ON film_rental
  FOR EACH ROW
  BEGIN
    DECLARE temp_email VARCHAR(50);
    DECLARE temp_rental_date DATETIME;
    SELECT customer.email, film_rental.rental_date INTO temp_email, temp_rental_date FROM film_rental INNER JOIN customer ON film_rental.customer_id = customer.customer_id WHERE film_rental.rental_id= OLD.rental_id;
    INSERT INTO `log` (`user_email`, `user_type`, `action`, `target`, `action_date`, `applied`) VALUES
    (temp_email, 'Customer', 'Delete', 'Film Rental', temp_rental_date, 1);
  END$
DELIMITER ;


--
-- Trigger to update log table on insert on serie_payment
--

DROP TRIGGER IF EXISTS log_insert_serie_payment;
DELIMITER $
CREATE TRIGGER log_insert_serie_payment
  AFTER INSERT ON serie_payment
  FOR EACH ROW
  BEGIN
    DECLARE temp_email VARCHAR(50);
    DECLARE temp_payment_date DATETIME;
    SELECT customer.email, serie_payment.payment_date INTO temp_email, temp_payment_date FROM serie_payment INNER JOIN customer ON serie_payment.customer_id = customer.customer_id WHERE serie_payment.payment_id = NEW.payment_id;
    INSERT INTO `log` (`user_email`, `user_type`, `action`, `target`, `action_date`, `applied`) VALUES
    (temp_email, 'Customer', 'Insert', 'Serie Payment', temp_payment_date, 1);
  END$
DELIMITER ;


--
-- Trigger to update log table on insert on film_payment
--

DROP TRIGGER IF EXISTS log_insert_film_payment;
DELIMITER $
CREATE TRIGGER log_insert_film_payment
  AFTER INSERT ON film_payment
  FOR EACH ROW
  BEGIN
    DECLARE temp_email VARCHAR(50);
    DECLARE temp_payment_date DATETIME;
    SELECT customer.email, film_payment.payment_date INTO temp_email, temp_payment_date FROM film_payment INNER JOIN customer ON film_payment.customer_id = customer.customer_id WHERE film_payment.payment_id = NEW.payment_id;
    INSERT INTO `log` (`user_email`, `user_type`, `action`, `target`, `action_date`, `applied`) VALUES
    (temp_email, 'Customer', 'Insert', 'Film Payment', temp_payment_date, 1);
  END$
DELIMITER ;


--
-- Trigger to update log table on update on serie_payment
--

DROP TRIGGER IF EXISTS log_update_serie_payment;
DELIMITER $
CREATE TRIGGER log_update_serie_payment
  AFTER UPDATE ON serie_payment
  FOR EACH ROW
  BEGIN
    DECLARE temp_email VARCHAR(50);
    DECLARE temp_payment_date DATETIME;
    SELECT customer.email, serie_payment.payment_date INTO temp_email, temp_payment_date FROM serie_payment INNER JOIN customer ON serie_payment.customer_id = customer.customer_id WHERE serie_payment.payment_id = NEW.payment_id;
    INSERT INTO `log` (`user_email`, `user_type`, `action`, `target`, `action_date`, `applied`) VALUES
    (temp_email, 'Customer', 'Update', 'Serie Payment', temp_payment_date, 1);
  END$
DELIMITER ;


--
-- Trigger to update log table on update on film_payment
--

DROP TRIGGER IF EXISTS log_update_film_payment;
DELIMITER $
CREATE TRIGGER log_update_film_payment
  AFTER UPDATE ON film_payment
  FOR EACH ROW
  BEGIN
    DECLARE temp_email VARCHAR(50);
    DECLARE temp_payment_date DATETIME;
    SELECT customer.email, film_payment.payment_date INTO temp_email, temp_payment_date FROM film_payment INNER JOIN customer ON film_payment.customer_id = customer.customer_id WHERE film_payment.payment_id = NEW.payment_id;
    INSERT INTO `log` (`user_email`, `user_type`, `action`, `target`, `action_date`, `applied`) VALUES
    (temp_email, 'Customer', 'Update', 'Film Payment', temp_payment_date, 1);
  END$
DELIMITER ;


--
-- Trigger to update log table on delete on serie_payment
--

DROP TRIGGER IF EXISTS log_delete_serie_payment;
DELIMITER $
CREATE TRIGGER log_delete_serie_payment
  AFTER DELETE ON serie_payment
  FOR EACH ROW
  BEGIN
    DECLARE temp_email VARCHAR(50);
    DECLARE temp_payment_date DATETIME;
    SELECT customer.email, serie_payment.payment_date INTO temp_email, temp_payment_date FROM serie_payment INNER JOIN customer ON serie_payment.customer_id = customer.customer_id WHERE serie_payment.payment_id = OLD.payment_id;
    INSERT INTO `log` (`user_email`, `user_type`, `action`, `target`, `action_date`, `applied`) VALUES
    (temp_email, 'Customer', 'Delete', 'Serie Payment', temp_payment_date, 1);
  END$
DELIMITER ;


--
-- Trigger to update log table on delete on film_payment
--

DROP TRIGGER IF EXISTS log_delete_film_payment;
DELIMITER $
CREATE TRIGGER log_delete_film_payment
  AFTER DELETE ON film_payment
  FOR EACH ROW
  BEGIN
    DECLARE temp_email VARCHAR(50);
    DECLARE temp_payment_date DATETIME;
    SELECT customer.email, film_payment.payment_date INTO temp_email, temp_payment_date FROM film_payment INNER JOIN customer ON film_payment.customer_id = customer.customer_id WHERE film_payment.payment_id = OLD.payment_id;
    INSERT INTO `log` (`user_email`, `user_type`, `action`, `target`, `action_date`, `applied`) VALUES
    (temp_email, 'Customer', 'Delete', 'Film Payment', temp_payment_date, 1);
  END$
DELIMITER ;


--
-- Trigger to stop all users from changing customer email addresses
--

DROP TRIGGER IF EXISTS no_customer_email_changing;
DELIMITER $
CREATE TRIGGER no_customer_email_changing
  BEFORE UPDATE ON customer
  FOR EACH ROW
  BEGIN
    IF (OLD.email != NEW.email) THEN
        SIGNAL SQLSTATE VALUE '45000'
	SET MESSAGE_TEXT = 'Invalid Operation! Cannot change customer email address!';
    END IF;
  END$
DELIMITER ;
