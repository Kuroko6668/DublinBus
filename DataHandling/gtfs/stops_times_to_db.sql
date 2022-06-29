DROP TABLE IF EXISTS stop_times;

CREATE TABLE `stop_times`
(
  `trip_id` varchar(60),
  `arrival_time` time,
  `departure_time` time,
  `stop_id` varchar(30),
  `stop_sequence` smallint,
  `stop_headsign` varchar(255),
  `pickup_type` int,
  `drop_off_type` int,
  `shape_dist_traveled` double
  -- CONSTRAINT pk_stop_times PRIMARY KEY(`trip_id`, `arrival_time`, `stop_id`)
);

LOAD DATA LOCAL INFILE '/Users/wangshengbin/Downloads/dublinbusdata/stop_times.txt' 
INTO TABLE dublin_bus.stop_times
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'  
LINES TERMINATED BY '\r\n' 
IGNORE 1 LINES;
