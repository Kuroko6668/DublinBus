import { useState} from "react";
import NearMeStops from './subcomponent/NearMeStops'
import { useGeolocation } from "../../Providers/GeolocationContext";
import { useGoogleMap } from "@react-google-maps/api";
import NearMeSearchBar from "./subcomponent/NearMeSearchBar";
import { Slider, Box,Button} from "@material-ui/core";
import './style.css'

// This is the main component for the NearMe section
function NearMe({back}) {
   // Grab the user position from the provider 
   const { position } = useGeolocation();
   const [distance, setDistance] = useState(3);
   const [page, setPage] = useState(1);
   const [resultsDisplayed, setResultsDisplayed] = useState(20);
   const mapRef = useGoogleMap()
   mapRef.setZoom(14);
    // function that sets the distance state with the new value
    const handleRange = (event,distance)=>{
    //输入函数体
        setDistance(distance)
        console.log(distance);
    }
    // function that sets the maximum number of results with the new value
   const handleResultsDisplayed = (event, newValue) => {
        setResultsDisplayed(newValue);
    };



   return (
      <div id="near_me">
        {/* Display nearme stops */}
        <div class="distanceSlider">
        <p>Maximum range (km)</p>
        <Slider 
            value={distance} 
            valueLabelDisplay={'on'}
            step={1}
            max={10} 
            min={1} 
            aria-label="Default"
            onChange={handleRange}
        />
        </div>
        <div class="resultsSlider">
        <p>Number stops displayed</p>
        <Slider 
            value={resultsDisplayed} 
            valueLabelDisplay={'on'}
            step={1}
            max={100} 
            min={1} 
            aria-label="Default"
            onChange={handleResultsDisplayed}
        />
        <NearMeSearchBar/>
        </div>
         {position && <NearMeStops position={position} distance={distance} resultsDisplayed={resultsDisplayed} valueLabelDisplay="auto"/>}
         <Button 
          sx={{ mt:1 }}
          style={{textTransform: 'none'}}
          variant='contained'
          onClick={()=>back(false)}
          size='small'
        >
         Back
        </Button>
      </div>
   );
};

export default NearMe;