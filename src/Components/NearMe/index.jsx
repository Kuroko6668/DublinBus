import { useEffect } from "react";
import NearMeStops from './subcomponent/NearMeStops'
import { useGeolocation } from "../../Providers/GeolocationContext";
import { useGoogleMap } from "@react-google-maps/api";

// This is the main component for the NearMe section
const NearMe = () => {
   // Grab the user position from the provider 
   const { position } = useGeolocation();

//    // Grab the map object from the provider 
//    const mapRef = useGoogleMap();

//    // Center the view on the user position the first time the component renders
//    useEffect(() => {
//       if (position) {
//          mapRef.panTo({
//             lat: position.lat,
//             lng: position.lng,
//          });
//       }
//       // eslint-disable-next-line
//    }, []);


   return (
      <>
         {/* Display nearme stops */}
         {position && <NearMeStops position={position} />}
      </>
   );
};

export default NearMe;