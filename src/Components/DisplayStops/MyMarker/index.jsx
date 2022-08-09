import { InfoWindow, Marker, useGoogleMap } from "@react-google-maps/api";
import { useState, useContext, useEffect } from "react";
import { Typography, Button, Modal, Box ,Card} from "@mui/material";
import ArrivalsTable from "./arrivalsTable";
import { reqStopById } from "../../../ajax";
import Waiting from "../../waiting";
import "./style.css";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import useAxios from "../../../utils/useAxios";
import IconButton from "@mui/material/IconButton";
import AuthContext from "../../../context/AuthContext";
import UserDataContext from "../../../context/UserDataContext";
// Cutomizable small component that creates a marker and centers the view at that position
const MyMarker = ({
  id,
  position,
  options,
  addFavouriteClick,
  removeFavouriteClick,
  isFavourite,
  isFavouriteListFull,
  ...restProps
}) => {
  // State to control the infowindow
  const [infoWindow, setInfoWindow] = useState(false);
  const [nextArrivals, setnextArrivals] = useState([]);
  // Hook to access the map reference
  const mapRef = useGoogleMap();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false)

  var response = []

  const handleOpen = async() => {
    setPending(true);
    response = await reqStopById(id).catch(()=>{
      setPending(false);
    })
    setnextArrivals(response.data.arrivals)
    setOpen(true)
    console.log(nextArrivals);
    setPending(false);
  };
  const handleClose = () => setOpen(false);
  const { user } = useContext(AuthContext);
  const { userData, removeFavourite } = useContext(UserDataContext);

  return (
    
    
    <Marker
      key={id}
      position={position}
      onClick={() => handleClick()}
      onDblClick={() => handleDoubleClick()}
      {...restProps}
    >
      {/* Display an infowindow if the state is active and the marker has a title*/}
      {infoWindow && (
          <InfoWindow
            position={position}
            onCloseClick={() => setInfoWindow(false)}
          >
            <div className="infowindow">
              {restProps.title}
              <Button
                onClick={() => {
                  handleOpen();
                }}
              >
                More
              </Button>
            </div>
          </InfoWindow>
        )}
        {pending&&
        <Card variant="margin_bottom"><Waiting size={50} thickness={3} /></Card>
        }

      <Modal
        style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {restProps.title}
          </Typography>

          {user && (
            <div>
              {!isFavourite && !isFavouriteListFull &&  (
                <IconButton
                  size="small"
                  aria-label="add-favourite"
                  className="favourite-btn"
                  onClick={()=> {
                    addFavouriteClick()
                  }}
                >
                  <FavoriteBorder /> Add to Favourites
                </IconButton>
              )}
              {isFavourite && (
                <IconButton
                  size="small"
                  aria-label="add-favourite"
                  className="favourite-btn"
                  onClick={()=> {
                    removeFavouriteClick()
                  }}
                >
                  <Favorite /> Remove from Favourite
                </IconButton>
              )} 
              {!isFavourite && isFavouriteListFull &&(
                <p>You already have 3 favourites, remove one to add this stop to the list</p>
              )}
            </div>
          )}
          <div id="modal-modal-description" sx={{ mt: 2 }}>
            <ArrivalsTable arrivals={nextArrivals} />
          </div>
        </Box>
      </Modal>
    </Marker>
  );

  function handleClick() {

    setInfoWindow(true);
  }

 
  function handleDoubleClick() {

    const zoom = mapRef.getZoom();
    if (zoom <= 16) {
      mapRef.setZoom(zoom + 1);
    }

    mapRef.panTo(position);
  }
};

export default MyMarker;

const style = {
  top: '50',
  left: '50',
  position: "absolute",
  width: 400,
  margin: 'auto',
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
