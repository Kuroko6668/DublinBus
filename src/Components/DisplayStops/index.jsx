import { useEffect, useState, useContext } from "react";
import iconStop from "../../assets/bus-stop.png";
import MyMarker from "./MyMarker";

import useAxios from "../../utils/useAxios";
import AuthContext from "../../context/AuthContext";

// This component returns a div and displays a marker for each stop in the array
// This div are wrapped by an accordion
const DisplayStops = ({ stops, addFavourite, removeFavourite, isFavouriteListFull }) => {
  const { user } = useContext(AuthContext);
  const [res, setRes] = useState("");
  const api = useAxios();

  let response;
  const [userData, setUserData] = useState({
    id:  user.user_id,
    favourite_stop_1: "0",
    favourite_stop_2: "0",
    favourite_stop_3: "0",
  });

//   const [isFavouriteListFull, setIsFavouriteListFull] = useState(false);
  async function fetchData() {
    try {
      const response = await api.get("/userdata/" + user.user_id);
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
    console.log(" Display stops useEffect");
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
          //   removeFavourite={() => {removeFavourite(stop.stop_id)}

          //   removeFavourite={() => {
          //     console.log("Clicked remove favourite");
          //     let newState = userData[0];
          //     if (
          //       Object.keys(userData[0]).find(
          //         (key) => userData[0][key] === stop.stop_id
          //       )
          //     ) {
          //       console.log("exists in favourites");
          //       const numberInFavourites = Object.keys(userData[0]).find(
          //         (key) => userData[0][key] === stop.stop_id
          //       );
          //       if (numberInFavourites) {
          //         newState[numberInFavourites] = "0";
          //       }
          //     } else {
          //       console.log("not in fav");
          //     }
          //     setUserData({ ...userData, 0: newState });
          //     api.put("/userdata/" + user.user_id, newState).then(() => {
          //       fetchData();
          //     });
          //   }}
        />
      ))}
    </>
  );
};

export default DisplayStops;
