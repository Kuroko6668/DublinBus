CREATE DATABASE IF NOT EXISTS `dublin_bus`;

USE dublin_bus;
DROP TABLE IF EXISTS routes;

CREATE TABLE `routes`
(
  `route_id` varchar(30), -- PRIMARY KEY,
  `agency_id` varchar(10),
  `route_short_name` varchar(10),
  `route_long_name` varchar(255),
  `route_type` int
);

LOAD DATA LOCAL INFILE '/Users/wangshengbin/Downloads/dublinbusdata/routes.txt' 
INTO TABLE dublin_bus.routes
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'  
LINES TERMINATED BY '\r\n' 
IGNORE 1 LINES;
