import { InfoWindow, Marker, useGoogleMap } from "@react-google-maps/api";
import { useState, useContext, useEffect } from "react";
import {Typography, Button, Modal, Box} from '@mui/material';
import ArrivalsTable from "./arrivalsTable";
import { reqStopById } from "../../../ajax";
import './style.css'
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import useAxios from "../../../utils/useAxios";
import IconButton from '@mui/material/IconButton';
import AuthContext from '../../../context/AuthContext';
// Cutomizable small component that creates a marker and centers the view at that position
const MyMarker = ({ 
  id, 
  position, 
  options, 
  isFavourite, 
  addFavourite, 
  removeFavourite, 
  ...restProps }) => 
{
  // State to control the infowindow
  const [infoWindow, setInfoWindow] = useState(false);
  const [nextArrivals, setnextArrivals] = useState([])
  // Hook to access the map reference
  const mapRef = useGoogleMap();
  const [open, setOpen] = useState(false);
  var response = []
  const handleOpen = async() => {
    response = await reqStopById(id)
    setnextArrivals(response.data.arrivals)
    setOpen(true)
  };
  const handleClose = () => setOpen(false);
  const { user } = useContext(AuthContext);


  return (
    <Marker
      key={id}
      position={position}
      onClick={() => handleClick()}
      onDblClick={() => handleDoubleClick()}
      {...restProps}
    >
      {/* Display an infowindow if the state is active and the marker has a title*/}
      {infoWindow && <InfoWindow
        position={position}
        onCloseClick={() => setInfoWindow(false)}
      >
        <div className="infowindow">
          {restProps.title}
          <Button onClick={()=>{handleOpen()}}>More</Button>

        </div>
      </InfoWindow>}
      <Modal
      className='stop-info-modal'
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
             {!isFavourite && ( 
                <IconButton size='small' aria-label="add-favourite" className='favourite-btn'
                  onClick={addFavourite}>
                  <Favorite /> Add to Favourites
                  </IconButton>
              )}
              {isFavourite && ( 
                <IconButton size='small' aria-label="add-favourite" className='favourite-btn'
                  onClick={removeFavourite}>
                <FavoriteBorder /> Remove from Favourites
                  </IconButton>
              )}
            </div>

            )}
          <div id="modal-modal-description" sx={{ mt: 2 }}>
            <ArrivalsTable arrivals={nextArrivals}/>
          </div>
        </Box>
      </Modal>

    </Marker>
  );

  // Zoom the view if the user clicks on the marker and display an infowindow
  function handleClick() {
    // Display the infowindow
    setInfoWindow(true);
  }

  // This function is called when the marker is clicked twice in a short period of time
  function handleDoubleClick() {
    // Zoom the view
    const zoom = mapRef.getZoom();
    if (zoom <= 16) {
      mapRef.setZoom(zoom + 1);
    }

    // Pans the view to the marker
    mapRef.panTo(position);
  }
};

export default MyMarker;



const style = {
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};