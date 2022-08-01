import { useState, useContext } from "react";
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

  const userData = {
    0: {
      id: "12312",
      favourite_stop_1: "8220DB001013",
      favourite_stop_2: "8220DB000895",
      favourite_stop_3: "8220DB000845",
    },
  };
  const { user } = useContext(AuthContext);

  const [displayFavWindow, setDisplayFavWindow] = useState(false);
  const [open, setOpen] = useState(false);
  const [nextArrivals, setnextArrivals] = useState([]);

  var response = [];
  // const stopId = '8220DB000002'
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

  const removeFavourite = () =>{
    console.log('Clicked remove favourite')
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
       
}

  return (
    <>
      <div id="favourite-stops">
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
            </TableBody>
          </Table>
        </TableContainer>
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

            <IconButton className='close-fav-modal-btn' onClick={handleClose}>
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
