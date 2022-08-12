from django.test import TestCase
import json
from . import check_for_update

# Create your tests here.


class gtfsrTest(TestCase):

    #use a static gtfsr modified dictionary
    with open("gtfsrProcessing/gtfsrDict_test.json","r") as f:
        gtfsr_static = json.load(f)
            
        
    #test if search of dictonaires when trip updates are present returns the correct delay
    def test_find_trip_by_tripid(self):
        delay_1 = 15180
        self.assertEqual(check_for_update.check_trip_for_update(self.gtfsr_static,"3993120.1.10-40-e20-1.86.I","8440B3550501"),delay_1)


        
        delay_2 = 3600
        self.assertEqual(check_for_update.check_trip_for_update(self.gtfsr_static,"3992398.1.10-51-e20-1.114.I","8380B357781"),delay_2)

    #test if no updates are present that the delay returned is 0
    def test_trip_not_found(self):
        no_delay = 0
        self.assertEqual(check_for_update.check_trip_for_update(self.gtfsr_static,"3398.1.10-51-e20-1.114.I","8380B357781"),no_delay)


    #test for a negative delay
    def test_check_for_negative_delay(self):
        
        neg_delay = -60

        self.assertEqual(check_for_update.check_trip_for_update(self.gtfsr_static,"3992408.1.10-51-e20-1.115.O","8400B6350301"),neg_delay)



    



   



    

    


    
