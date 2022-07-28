import { useState} from "react";
import NearMeStops from './subcomponent/NearMeStops'
import { useGeolocation } from "../../Providers/GeolocationContext";
import { useGoogleMap } from "@react-google-maps/api";
import NearMeSearchBar from "./subcomponent/NearMeSearchBar";
import { Slider, Box,Button, TableHead} from "@material-ui/core";
import './style.css'
import Favorite from '@mui/icons-material/Favorite';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

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

    const userData = {0:{
        id: '12312',
        favourite_stop_1: '852',
        favourite_stop_2: '756',
        favourite_stop_3: '958'
    }}

   return (
    <><div id="favourite-stops">
                                  


                                  <TableContainer>
      <Table sx={{ minWidth: 250 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell> <Favorite /> My Favourite Stops</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              key={1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" onClick={() => {
                console.log('CLicked fav stop 1' )
              }} onFocus={()=>{
                console.log('Hovered stop 1')
              }}>
                {userData[0].favourite_stop_1}
              </TableCell>
            </TableRow>
            <TableRow
              key={2}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"onClick={() => {
                console.log('CLicked fav stop 2' )
              }}>
                {userData[0].favourite_stop_2}
              </TableCell>
            </TableRow>
                        <TableRow
              key={3}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"onClick={() => {
                console.log('CLicked fav stop 3' )
              }}>
                {userData[0].favourite_stop_3}
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>








  
       </div><div id="near_me">
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
                       onChange={handleRange} />
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
                       onChange={handleResultsDisplayed} />
                   <NearMeSearchBar />
               </div>
               {position && <NearMeStops position={position} distance={distance} resultsDisplayed={resultsDisplayed} valueLabelDisplay="auto" />}
               <Button
                   sx={{ mt: 1 }}
                   style={{ textTransform: 'none', padding: '3px' }}
                   variant='contained'
                   onClick={() => back(false)}
                   size='small'
               >
                   Back
               </Button>
           </div></>
   );
};

export default NearMe;