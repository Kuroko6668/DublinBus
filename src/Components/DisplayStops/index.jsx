import { useEffect, useState, useContext } from "react";
import iconStop from "../../assets/bus-stop.png";
import MyMarker from "./MyMarker";
import myAxios from '../../ajax/myAxios';

import useAxios from "../../utils/useAxios";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

// This component returns a div and displays a marker for each stop in the array
// This div are wrapped by an accordion
const DisplayStops = ({ stops, addFavourite, removeFavourite, isFavouriteListFull }) => {
  const { user } = useContext(AuthContext);
  const [res, setRes] = useState("");
  const api = useAxios();

  let response;
  const [userData, setUserData] = useState({
    id:  '0',
    favourite_stop_1: "0",
    favourite_stop_2: "0",
    favourite_stop_3: "0",
  });

  async function fetchData() {
    try {  
      const response = await api.get("/userdata/" + user.user_id);
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if(user) {
      fetchData();
    }
  }, []);

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
          addFavourite={() => {
            fetchData();
            addFavourite(stop.stop_id);
          }}
          removeFavourite={() => {
            removeFavourite(stop.stop_id);
            fetchData();
          }}
        />
      ))}
    </>
  );
};

export default DisplayStops;
