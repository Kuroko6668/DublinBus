import { useEffect, useState } from 'react';
import iconStop from "../../assets/bus-stop.png";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import { AccordionDetails, AccordionSummary } from '@material-ui/core';
import { useGoogleMap, Marker, InfoWindow} from '@react-google-maps/api';
import MyMarker from './MyMarker';



// This component returns a div and displays a marker for each stop in the array
// This div are wrapped by an accordion
const DisplayStops = ({stops}) => {


    return (<>
        {stops.map((stop)=>(
        <MyMarker
            key={stop.stop_id}
            id={stop.stop_id}
            position={{lat:stop.stop_lat,lng:stop.stop_long}}
            icon={iconStop}
            title={stop.stop_name}
        />))}

    </>)


};

export default DisplayStops;