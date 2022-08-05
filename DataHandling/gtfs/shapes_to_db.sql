CREATE DATABASE IF NOT EXISTS `dublin_bus`;

USE dublin_bus;

DROP TABLE IF EXISTS shapes;

CREATE TABLE `shapes`
(
  `shape_id` varchar(30),
  `shape_pt_lat` double,
  `shape_pt_lon` double,
  `shape_pt_sequence` smallint,
  `shape_dist_traveled` double
  -- CONSTRAINT pk_shapes PRIMARY KEY(`shape_id`, `shape_pt_sequence`)
);


LOAD DATA LOCAL INFILE '/Users/wangshengbin/Downloads/dublinbusdata/shapes.txt' 
INTO TABLE dublin_bus.shapes
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'  
LINES TERMINATED BY '\r\n' 
IGNORE 1 LINES;