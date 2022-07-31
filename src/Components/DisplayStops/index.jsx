import { useEffect, useState } from 'react';
import iconStop from "../../assets/bus-stop.png";
import MyMarker from './MyMarker';




// This component returns a div and displays a marker for each stop in the array
// This div are wrapped by an accordion
const DisplayStops = ({stops}) => {

    return (<>
        {stops.map((stop)=>(
        <MyMarker
            key={Math.random().toString(36)}
            id={stop.stop_id}
            position={{lat:stop.stop_lat,lng:stop.stop_long}}
            icon={iconStop}
            title={stop.stop_name}
        />))}

    </>)


};

export default DisplayStops;