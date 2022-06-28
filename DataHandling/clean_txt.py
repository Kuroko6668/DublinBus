from datetime import datetime

from dateutil import parser
import logging

logging.basicConfig(filename = "clean_txt.log", level=logging.DEBUG)


def clean_txt_file(file,newFile):
    
    f = open(newFile,"w")

    for row in file:
        
        #replace incorrect delimeters
        row = row.replace(",","")
        
        #split row and create list
        row = row.split(";")

        #replace non entries with sql compatible "NULL"
        row = ["NULL" if x == '' else x for x in row]

        for position,value in enumerate(row):
            
            value = value.strip()

            #DAYFOSERVIE or LASTUDATE positions
            if position == 1 or position == len(row)-2:
                try:
                    #change datetimes using dateutil package
                    row[position] = str(parser.parse(value))
                    
                    
                except Exception as e:
                    #should throw error at first (heading) row
                    logging.warning("error at position " + str(position) + " with value " + value + ", error =  " + str(e) + "in file " + str(file) )

            #join row by sep and write to new file
            sep = ","
            newRow = sep.join(row)
        f.write(newRow)

leavtimesRawTxt = open("C:/Users/35383/Documents/UCDBusData/chunk1.txt", "r")
tripsRawTxt = open("C:/Users/35383/Documents/UCDBusData/chunk1.txt", "r")
tripsNewFile = "trips.csv"
leavtimesNewFile = "leavetimes.csv"

clean_txt_file(leavtimesRawTxt,leavtimesNewFile)
clean_txt_file(tripsRawTxt,tripsNewFile)


        
        
        
     


   
        

    

    
    
    
