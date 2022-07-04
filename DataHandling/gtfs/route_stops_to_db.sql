use dublin_bus;
DROP TABLE IF EXISTS route_stops_0;
create table route_stops_0 as SELECT distinct s.stop_id ,r.route_short_name,t.direction_id,t.trip_headsign, s.stop_sequence FROM stop_times s,trips t,routes r
where t.trip_id = s.trip_id and r.route_id=t.route_id and t.direction_id = 0;

DROP TABLE IF EXISTS route_stops_1;
create table route_stops_1 as SELECT distinct s.stop_id ,r.route_short_name,t.direction_id,t.trip_headsign, s.stop_sequence FROM stop_times s,trips t,routes r
where t.trip_id = s.trip_id and r.route_id=t.route_id and t.direction_id = 1;

create table route_stops as
 select * from route_stops_0
 union 
 select * from route_stops_1

DROP TABLE IF EXISTS route_stops_1;
DROP TABLE IF EXISTS route_stops_0;
 