import geodist from "geodist";
import { useEffect, useState } from "react";
import { useStops } from "../../../../Providers/StopsContext";
import DisplayStops from "../../../DisplayStops";

const NearMeStops = ({ position, distance, resultsDisplayed}) => {
    const [nearStops, setNearStops] = useState([]);
    const [visibleStops, setVisibleStops] = useState([]);
    const { data } = useStops();
 
/*eslint-disable */

   useEffect(() => {
      findNearStops(data);
      console.log(data);
   }, [data, distance, resultsDisplayed]);

/*eslint-enable */


    return nearStops&&(
       <>
            <DisplayStops stops={visibleStops} />
       </>
    )
    function findNearStops(stops) {
        if (!stops) return;
    
        let nearStopsArray = stops.filter((stop) => {
           var dist = geodist({ lat: position.lat, lng: position.lng, }, { lat: stop.stop_lat, lon: stop.stop_long }, { exact: true, unit: 'km' });
           if (dist < distance) {
              stop.stop_dist = dist;
              return stop;
           }
           else return null;
        });
        console.log(nearStopsArray,'nearStopsArray');
        if (nearStopsArray.length === 0) {
           setNearStops("no stops");
           return null;
        }
    
    
        nearStopsArray.sort((a,b)=>{
            if (a.stop_dist < b.stop_dist) {
               return -1;
            }
            if (a.stop_dist > b.stop_dist) {
               return 1;
            }
            return 0;
        });
        nearStopsArray = nearStopsArray.slice(0, resultsDisplayed);
        setNearStops(nearStopsArray);
        setVisibleStops(nearStopsArray);
     }
    
}

export default NearMeStops;