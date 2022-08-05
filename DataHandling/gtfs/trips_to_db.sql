CREATE DATABASE IF NOT EXISTS `dublin_bus`;

USE dublin_bus;

DROP TABLE IF EXISTS trips;

CREATE TABLE `trips`
(
  `route_id` varchar(30),
  `service_id` varchar(30),
  `trip_id` varchar(60), -- PRIMARY KEY,
  `shape_id` varchar(30),
  `trip_headsign` varchar(255),
  `direction_id` int
);

LOAD DATA LOCAL INFILE '/Users/wangshengbin/Downloads/dublinbusdata/trips.txt' 
INTO TABLE dublin_bus.trips
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'  
LINES TERMINATED BY '\r\n' 
IGNORE 1 LINES;