import { useEffect, useState, useContext } from "react";
import iconStop from "../../assets/bus-stop.png";
import MyMarker from "./MyMarker";
import myAxios from '../../ajax/myAxios';

import useAxios from "../../utils/useAxios";
import AuthContext from "../../context/AuthContext";
import UserDataContext from "../../context/UserDataContext";
import axios from "axios";

// This component returns a div and displays a marker for each stop in the array
// This div are wrapped by an accordion
const DisplayStops = ({ stops,
isFavouriteListFull }) => {
  const { user } = useContext(AuthContext);
  const [res, setRes] = useState("");
  const api = useAxios();

  const { userData, addFavourite, removeFavourite } = useContext(UserDataContext);

  return (
    <>
      {stops.map((stop) => (
        <MyMarker
          key={Math.random().toString(36)}
          id={stop.stop_id}
          position={{ lat: stop.stop_lat, lng: stop.stop_long }}
          isFavourite={
            userData && userData[0]
              ? Object.keys(userData[0]).find(
                  (key) => userData[0][key] === stop.stop_id
                )
              : false
          }
          isFavouriteListFull={isFavouriteListFull}
          icon={iconStop}
          title={stop.stop_name}
          addFavouriteClick={() => {
            addFavourite(stop.stop_id)
            console.log('Add fav click')
          }}
          removeFavouriteClick={() => {
            removeFavourite(stop.stop_id)
            console.log('Remove fav click')
          }}
        />
      ))}
    </>
  );
};

export default DisplayStops;
