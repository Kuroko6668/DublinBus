import { InfoWindow, Marker, useGoogleMap } from "@react-google-maps/api";
import { useState } from "react";
import {Typography, Button, Modal, Box} from '@mui/material';
import ArrivalsTable from "./arrivalsTable";
import './style.css'

// Cutomizable small component that creates a marker and centers the view at that position
const MyMarker = ({ id, position, options, ...restProps }) => {
  // State to control the infowindow
  const [infoWindow, setInfoWindow] = useState(false);
  // Hook to access the map reference
  const mapRef = useGoogleMap();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
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
          <Button onClick={handleOpen}>More</Button>
        </div>
      </InfoWindow>}
      <Modal
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
            <ArrivalsTable arrivals={placeholder}/>
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

const placeholder = [{
  route_short_name: "39a",
  trip_headsign:" Shanard Road (Shanard Avenue) - Shaw Street",
  due_in_mins:6,
  delay_in_sec:300,
},{
  route_short_name: "39a",
  trip_headsign:" Shanard Road (Shanard Avenue) - Shaw Street",
  due_in_mins:14,
  delay_in_sec:300,
},{
  route_short_name: "39a",
  trip_headsign:" Shanard Road (Shanard Avenue) - Shaw Street",
  due_in_mins:16,
  delay_in_sec:300,
},{
  route_short_name: "39a",
  trip_headsign:" Shanard Road (Shanard Avenue) - Shaw Street",
  due_in_mins:20,
  delay_in_sec:300,
},{
  route_short_name: "39a",
  trip_headsign:" Shanard Road (Shanard Avenue) - Shaw Street",
  due_in_mins:24,
  delay_in_sec:300,
},{
  route_short_name: "39a",
  trip_headsign:" Shanard Road (Shanard Avenue) - Shaw Street",
  due_in_mins:27,
  delay_in_sec:300,
},{
  route_short_name: "39a",
  trip_headsign:" Shanard Road (Shanard Avenue) - Shaw Street",
  due_in_mins:30,
  delay_in_sec:300,
}
]

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};