import { useGeolocation } from "../../Providers/GeolocationContext";
import { Marker } from '@react-google-maps/api';
import userlocation from '../../assets/user.png'
// A marker that is render every 10 seconds using the geolocation provider
// It is render the first time the map renders
const MarkerUserPosition = () => {
   const { position } = useGeolocation();
   console.log(position);
   // If there is no a user position in the provider return null
   if (!position) return "";
   else return (
      /* Display a marker at the user position*/
      <Marker
        key={new Date().getTime()}
        position={position}
        icon={userlocation}
      />
   );
};

export default MarkerUserPosition;