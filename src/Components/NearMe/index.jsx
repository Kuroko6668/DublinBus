import { useState, useContext, useEffect } from "react";
import NearMeStops from "./subcomponent/NearMeStops";
import { useGeolocation } from "../../Providers/GeolocationContext";
import { useGoogleMap, InfoWindow } from "@react-google-maps/api";
import NearMeSearchBar from "./subcomponent/NearMeSearchBar";
import { Slider, Box, Button, TableHead, IconButton } from "@material-ui/core";
import "./style.css";
import Favorite from "@mui/icons-material/Favorite";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { reqStopById } from "../../ajax";
import AuthContext from "../../context/AuthContext";
import ArrivalsTable from "../DisplayStops/MyMarker/arrivalsTable/index";
import { Typography, Modal } from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import CloseIcon from "@mui/icons-material/Close";
import useAxios from "../../utils/useAxios";

// This is the main component for the NearMe section
function NearMe({ back }) {
  // Grab the user position from the provider
  const { position } = useGeolocation();
  const [distance, setDistance] = useState(3);
  const [page, setPage] = useState(1);
  const [resultsDisplayed, setResultsDisplayed] = useState(20);
  const mapRef = useGoogleMap();
  mapRef.setZoom(14);
  // function that sets the distance state with the new value
  const handleRange = (event, distance) => {
    //输入函数体
    setDistance(distance);
    console.log(distance);
  };
  // function that sets the maximum number of results with the new value
  const handleResultsDisplayed = (event, newValue) => {
    setResultsDisplayed(newValue);
  };
  const api = useAxios();

  // const userData = {
  //   0: {
  //     id: "12312",
  //     favourite_stop_1: "8220DB001013",
  //     favourite_stop_2: "8220DB000895",
  //     favourite_stop_3: "8220DB000845",
  //   },
  // };
  const { user } = useContext(AuthContext);
  const [isFavouriteListFull, setIsFavouriteListFull] = useState(false);

  // let response;
  const [userData, setUserData] = useState([
    {
      id: '0', // user.user_id,
      favourite_stop_1: "0",
      favourite_stop_2: "0",
      favourite_stop_3: "0",
    },
  ]);

  async function fetchData() {
    try {
      const userResponse = await api.get("/userdata/" + user.user_id); //.then(setUserData(response.data))
      setUserData(userResponse.data);
      console.log("NEAR ME fetch data");
      console.log(userResponse.data);

      if (userData && userData[0]) {
        console.log(
          Object.keys(userData[0]).find((key) => userData[0][key] === "0")
        );
        if (
          !Object.keys(userResponse.data[0]).find(
            (key) => userResponse.data[0][key] === "0"
          )
        ) {
          console.log("NEAR ME set is full to true");
          setIsFavouriteListFull(true);
        } else {
          console.log("NEAR ME set is full to FALSE");
          setIsFavouriteListFull(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(
    () => {
      fetchData();
      console.log("Near me useEffect");

      // }, []);
    },
    [
      // userData[0].favourite_stop_1,
      // userData[0].favourite_stop_2,
      // userData[0].favourite_stop_3,
    ]
  );

  const [displayFavWindow, setDisplayFavWindow] = useState(false);
  const [open, setOpen] = useState(false);
  const [nextArrivals, setnextArrivals] = useState([]);

  let response = [];
  const handleOpen = async (stopId) => {
    response = await reqStopById(stopId);
    setnextArrivals(response.data.arrivals);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const style = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    height: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const removeFavourite = (stop_id) => {
    console.log(stop_id);
    // console.log("Clicked remove favourite");
    // let newState = userData[0];
    // if(Object.keys(userData[0]).find(key => userData[0][key] === stop.stop_id)) {
    //     console.log('exists in favourites')
    //     const numberInFavourites = Object.keys(userData[0]).find(key => userData[0][key] === stop.stop_id)
    //     if(numberInFavourites) {
    //         newState[numberInFavourites] = '0'
    //     }
    // }
    // else {console.log('not in fav')}
    // setUserData({...userData, 0: newState})
    // api.put("/userdata/" + user.user_id, newState).then(() => {
    //     fetchData()
    // })
    console.log("Near me remove " + stop_id);
    // console.log(stop_id);
    console.log("Clicked remove favourite");
    let newState = userData[0];
    if (Object.keys(userData[0]).find((key) => userData[0][key] === stop_id)) {
      console.log("exists in favourites");
      const numberInFavourites = Object.keys(userData[0]).find(
        (key) => userData[0][key] === stop_id
      );
      if (numberInFavourites) {
        newState[numberInFavourites] = "0";
      }
    } else {
      console.log("not in fav");
    }
    setUserData({ ...userData, 0: newState });
    api.put("/userdata/" + user.user_id, newState).then(() => {
      fetchData();
    });
  };

  // removeFavourite={(stop_id) => {
  //   console.log('Near me remove ' + stop_id);
  //   console.log("Clicked remove favourite");
  // let newState = userData[0];
  // if (
  //   Object.keys(userData[0]).find(
  //     (key) => userData[0][key] === stop_id
  //   )
  // ) {
  //   console.log("exists in favourites");
  //   const numberInFavourites = Object.keys(userData[0]).find(
  //     (key) => userData[0][key] === stop_id
  //   );
  //   if (numberInFavourites) {
  //     newState[numberInFavourites] = "0";
  //   }
  // } else {
  //   console.log("not in fav");
  // }
  // setUserData({ ...userData, 0: newState });
  // api.put("/userdata/" + user.user_id, newState).then(() => {
  //   fetchData();
  // });
  // }}

  return (
    <>
      <div id="favourite-stops">
        {userData && userData[0] && (
          <TableContainer>
            <Table sx={{ minWidth: 250 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    {" "}
                    <Favorite /> My Favourite Stops
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData[0].favourite_stop_1 != "0" && (
                  <TableRow
                    key={1}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      onClick={() => {
                        handleOpen(userData[0].favourite_stop_1);
                      }}
                      onFocus={() => {
                        console.log("Hovered stop 1");
                      }}
                    >
                      {userData[0].favourite_stop_1}
                    </TableCell>
                  </TableRow>
                )}
                {userData[0].favourite_stop_2 != "0" && (
                  <TableRow
                    key={2}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      onClick={() => {
                        handleOpen(userData[0].favourite_stop_2);
                      }}
                    >
                      {userData[0].favourite_stop_2}
                    </TableCell>
                  </TableRow>
                )}

                {userData[0].favourite_stop_3 != "0" && (
                  <TableRow
                    key={3}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      onClick={() => {
                        handleOpen(userData[0].favourite_stop_3);
                      }}
                    >
                      {userData[0].favourite_stop_3}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
      <div id="near_me">
        {/* Display nearme stops */}
        <div class="distanceSlider">
          <p>Maximum range (km)</p>
          <Slider
            value={distance}
            valueLabelDisplay={"on"}
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
            valueLabelDisplay={"on"}
            step={1}
            max={100}
            min={1}
            aria-label="Default"
            onChange={handleResultsDisplayed}
          />
          <NearMeSearchBar />
        </div>
        {position && (
          <NearMeStops
            position={position}
            distance={distance}
            resultsDisplayed={resultsDisplayed}
            valueLabelDisplay="auto"
            addFavourite={(stop_id) => {
              console.log("near me ");
              console.log(stop_id);
              //     console.log("ADD TO FAV");

              let newState = userData[0];
              if (
                !Object.keys(userData[0]).find(
                  (key) => userData[0][key] === stop_id
                )
              ) {
                console.log("doesnt exist in favourites");

                const availableFavourite = Object.keys(userData[0]).find(
                  (key) => userData[0][key] === "0"
                );
                if (availableFavourite) {
                  newState[availableFavourite] = stop_id;
                } else {
                  console.log("have 3 favourites");
                }
              } else {
                console.log("already in fav");
              }
              setUserData({ ...userData, 0: newState });
              api.put("/userdata/" + user.user_id, newState).then(() => {
                fetchData();
              });
              //
            }}
            removeFavourite={(stop_id) => {
              console.log("Near me remove " + stop_id);
              console.log("Clicked remove favourite");
              let newState = userData[0];
              if (
                Object.keys(userData[0]).find(
                  (key) => userData[0][key] === stop_id
                )
              ) {
                console.log("exists in favourites");
                const numberInFavourites = Object.keys(userData[0]).find(
                  (key) => userData[0][key] === stop_id
                );
                if (numberInFavourites) {
                  newState[numberInFavourites] = "0";
                }
              } else {
                console.log("not in fav");
              }
              setUserData({ ...userData, 0: newState });
              api.put("/userdata/" + user.user_id, newState).then(() => {
                fetchData();
              });
            }}
            isFavouriteListFull={isFavouriteListFull}
          />
        )}
        <Button
          sx={{ mt: 1 }}
          style={{ textTransform: "none", padding: "3px" }}
          variant="contained"
          onClick={() => back(false)}
          size="small"
        >
          Back
        </Button>
      </div>

      <Modal
        className="stop-info-modal"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} aria-describedby="modal-modal-description">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {/* {restProps.title} */}
            {"Favourite stop title"}
          </Typography>

          <IconButton className="close-fav-modal-btn" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          {user && (
            <div>
              <IconButton
                size="small"
                aria-label="add-favourite"
                className="favourite-btn"
                onClick={removeFavourite}
              >
                <FavoriteBorder /> Remove from Favourites
              </IconButton>
            </div>
          )}
          <div id="modal-modal-description" sx={{ mt: 2 }}>
            <ArrivalsTable arrivals={nextArrivals} />
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default NearMe;
