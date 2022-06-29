import { useEffect, useState } from 'react';
import iconStop from "../../assets/bus-stop.png";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import { AccordionDetails, AccordionSummary } from '@material-ui/core';
import { useGoogleMap, Marker } from '@react-google-maps/api';



// This component returns a div and displays a marker for each stop in the array
// This div are wrapped by an accordion
const DisplayStops = ({stops}) => {


    return (<>
        {console.log(stops)}
        {stops.slice(0,5).map((stop)=>(
        <Marker
            key={stop.stop_id}
            position={{lat:stop.stop_lat,lng:stop.stop_long}}
            icon={iconStop}
        />))}

    </>)


};

export default DisplayStops;