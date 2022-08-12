# Instruction for execution of data handling:

## Create data architecture environment: 

1 - Set up a mySQL server locally/ on UCD virtual machine. This is used as a data lake to store data for the predictive model

2 - Set up an AWS RDS mySQL server (or alternatively use the built in Django mySQL lite facility). This will be used to serve data to the Django MVC. 

## Add GTFS data to both servers by:

wget GTFS data from  https://www.transportforireland.ie/transitData/PT_Data.html

To load GTFS data into AWS mySQL database there are multiple options. The easiest is to link a mySQL workbench instance to the AWS RDS, and then run the code located within the GTFS_to_db.sql file as a sql query. Ensure permissions are granted by adding OPT_LOCAL_INFILE=1 to the advanced connection settings. 


To load into the UCD mySQL server, log in using mysql-u {user }-p {password}  and then run GTFS_to_db.sql as a query. The OPT_LOCAL_INFILE=1 permissions must be added manually to the mysql configuration files on the VM to allow this operation.

## Add historical Data to the UCD VM:

The data is private, and so cannot be removed off the UCD virtual machine machine services. The raw data contains two files of interest, the rt_leavetime_2018.csv and rt_trips_2018.csv.

In the clean_txt.py file, ensure that the file paths are correct to the location of your raw data and then execute. This script modifies the data so it is mySQL compatible.

Log in to the mySQL server on the UCD VM using the command mysql -u {user} -p {password} and then run the file hisorical_data_to_db.sql as a query. Ensure that the file paths match the files that were output from the clean_txt.py script. This will load the data into two relational tables in the database. 

## Run query to return selected features for predictive model:

Log in to mySQL server on VM using mysql-u {user }-p {password}. Run the following SQL query to return the required data, modifying the file name and dates within the condition for each month of the calendar year i.e. return a subsection of data for each month. 


    SELECT t.dayofservice_, t.tripid_, t.lineid_,t.direction_, t.planned_arr_time_ as planned_arr_T, t.planned_dep_time_ as planned_dep_T, t.arrival_time_ as arrival_time_T, t.departure_time_ as departure_time_T, l.progrnumber, l.stoppointid,t.suppressed_, l.planned_arr_time as planned_arr_L, l.planned_dep_time as planned_dep_L, l.arrivaltime as arrival_time_L, l.departuretime as departure_time_L, l.vehicleid, l.lastupdate

    FROM dublin_bus.rt_leavetimes_2018 l, dublin_bus.rt_trips_2018 t

    WHERE t.tripid_ = l.tripid and t.dayofservice_ = l.dayofservice 
    and t.dayofservice_ < "2018-09-01" 
    and t.dayofservice_ >{first of the next month}
    INTO OUTFILE '~/{filename}.csv'

    FIELDS TERMINATED BY ','
    ENCLOSED BY '"'
    LINES TERMINATED BY '\n';


## SCP the data to the UCD HP VM (the data warehouse):

Use a similar scp command to send the data to the HP VM for processing, cleaning and modelling.

    scp ~/filepath {HP server hostname}:filepath
