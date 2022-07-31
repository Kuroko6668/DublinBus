import { InfoWindow, Marker, useGoogleMap } from "@react-google-maps/api";
import { useState } from "react";
import {Typography, Button, Modal, Box, Card} from '@mui/material';
import ArrivalsTable from "./arrivalsTable";
import { reqStopById } from "../../../ajax";
import Waiting from "../../waiting";
import { makeStyles, Dialog } from '@material-ui/core';
import './style.css'

// Cutomizable small component that creates a marker and centers the view at that position
const MyMarker = ({ id, position, options, ...restProps }) => {
  // State to control the infowindow
  const [infoWindow, setInfoWindow] = useState(false);
  const [nextArrivals, setnextArrivals] = useState([])
  // const [modalStyle] = useState(getModalStyle);
  // Hook to access the map reference
  const mapRef = useGoogleMap();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false)
  // function getModalStyle() {
  //   const top = 50;
  //   const left = 50;
  //   return {
  //     top: `${top}%`,
  //     left: `${left}%`,
  //     transform: `translate(-${top}%, -${left}%)`
  //   };
  // }
  var response = []
  // const useStyles = makeStyles(theme => ({
  //   paper: {
  //     position: "absolute",
  //     width: 300,
  //     padding: 20
  //   }
  // }))
  // const classes = useStyles();
  const handleOpen = async() => {
    setPending(true);
    response = await reqStopById(id)
    setnextArrivals(response.data.arrivals)
    setOpen(true)
    console.log(nextArrivals);
    setPending(false);
  };
  const handleClose = () => setOpen(false);
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
          <Button onClick={()=>handleOpen()}>More</Button>
        </div>
      </InfoWindow>}
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
  top: '50',
  left: '50',
  position: "absolute",
  // transform: 'translate(-50%, -50%)',
  width: 400,
  margin: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};