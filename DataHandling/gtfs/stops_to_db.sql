CREATE DATABASE IF NOT EXISTS `dublin_bus`;

USE dublin_bus;
DROP TABLE IF EXISTS stops;

CREATE TABLE `stops`
(
  `stop_id` varchar(30),
  `stop_name` varchar(255),
  `stop_lat` double,
  `stop_long` double
  -- CONSTRAINT pk_stops PRIMARY KEY(`stop_id`, `stop_name`)
);

LOAD DATA LOCAL INFILE '/Users/wangshengbin/Downloads/dublinbusdata/stops.txt' 
INTO TABLE dublin_bus.stops
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'  
LINES TERMINATED BY '\r\n' 
IGNORE 1 LINES;