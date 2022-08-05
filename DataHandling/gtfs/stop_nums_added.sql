CREATE TABLE `stops_with_nums`
(
  `stop_id` varchar(30),
  `stop_name` varchar(255),
  `stop_lat` double,
  `stop_long` double,
  `stop_num` int
  
);

LOAD DATA LOCAL INFILE 'C:/Users/35383/Documents/busTestRepo/BusDataAnalytics/stops_with_nums.csv' 
INTO TABLE dublin_bus.stops_with_nums
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'  
LINES TERMINATED BY '\r\n' 
IGNORE 1 LINES;