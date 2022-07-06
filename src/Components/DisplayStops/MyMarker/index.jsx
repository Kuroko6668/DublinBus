import { InfoWindow, Marker, useGoogleMap } from "@react-google-maps/api";
import { useState } from "react";
import './style.css'

// Cutomizable small component that creates a marker and centers the view at that position
const MyMarker = ({ id, position, options, ...restProps }) => {
  // State to control the infowindow
  const [infoWindow, setInfoWindow] = useState(false);

  // Hook to access the map reference
  const mapRef = useGoogleMap();


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
          <p>{restProps.title}</p>
        </div>
      </InfoWindow>}

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
