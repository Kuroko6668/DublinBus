CREATE DATABASE IF NOT exists dublin_bus;

CREATE TABLE if not exists dublin_bus.rt_2018_leavetimes_sample (
	dayofservice datetime,
	tripid int,
	progrnumber int,
	stoppointid int,
	plannedtime_arr int,
	plannedtime_dep int,	
	actualtime_arr int,
	actualtime_dep int,
	vehicleid int,	
	lastupdate datetime

	);
    
LOAD DATA LOCAL INFILE "C:/Users/35383/Documents/busTestRepo/BusDataAnalytics/leavetimes2018.csv"
INTO TABLE dublin_bus.rt_2018_leavetimes_sample
FIELDS TERMINATED BY ","
ENCLOSED BY "'"
LINES TERMINATED BY '\n';


CREATE DATABASE IF NOT exists dublin_bus;

CREATE TABLE if not exists dublin_bus.rt_trips_2018 (
	    DayOfService datetime,
	    TripID int,
	    LineId varchar(255),
	    RouteId varchar(255),
	    Direction boolean,
	    PlannedTime_Arr int,
	    PlannedTime_Dep int,
	    ActualTime_Arr int,
	    ActualTime_Dep int,
	    LastUpdate datetime,
	    Note varchar(225)
	    
	);
    
    
LOAD DATA LOCAL INFILE "C:/Users/35383/Documents/busTestRepo/BusDataAnalytics/trips2018.csv" INTO TABLE dublin_bus.rt_trips_2018
FIELDS TERMINATED BY ","
ENCLOSED BY "'"
LINES TERMINATED BY '\n';