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
