import React, { useState } from "react";
import {  useLoadScript } from "@react-google-maps/api";
import { useEffect } from "react";
import {Component} from 'react'
import { GoogleMap, useJsApiLoader, Marker, Autocomplete, DirectionsRenderer} from '@react-google-maps/api';
// import { Button, Tooltip, Input, Card, Space, Alert} from 'antd';
import { useRef} from 'react';
import { CloseOutlined, AimOutlined} from '@ant-design/icons';
import { reqAllStops } from '../../ajax';
import {Typography, Button, Input, Box} from '@mui/material';
import { useStops } from '../../Providers/StopsContext';
import {useGeolocation} from '../../Providers/GeolocationContext'

// Google map libraries
const libraries = ["places"];

// CSS Styles for the container
const containerStyle = {
  position: "relative",
  width: "100%",
  height: "100%",
};

// Custom options for the map.
const options = {
  mapTypeControl: false,
  fullscreenControl: false,
  streetViewControl: false,
};

// Default options for the map
const defaultOptions = {
  mapTypeControl: false,
  fullscreenControl: false,
  streetViewControl: false,
//   styles: lightTheme,
};


// dict for the mapStyles
// const mapStyles = {
//   "defaultThemeLight": lightTheme,
//   "defaultThemeDark": darkTheme,
//   "defaultThemeGrey": greyTheme
// };

// Center of the map when it loads. In this case Dublin center
const center = {
  lat: 53.349804,
  lng: -6.26031,
};

// This is the main component for the bus page. 
// Loads a google map and wraps all the other components in a context
export default function MapContainer(props) {
  // State to control the map theme
  const [theme, setTheme] = useState();

  // Grab the current theme from the provider
//   const currentStyles = useTheme().theme;

  // Loads the map
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDx7hqNSGl-APJh5HalGhaCqHrfpF84jKc",
    libraries,
    version: "3.46",
  });

  // Call the providers to load the data for every component
  // It is not a problem to call it multiple times because it only performs the fetch operation
  // the first time
  // We do not need to get the data in any variable
  useStops();
//   useLines();

//   const { currentUser } = useAuth();
  useEffect(() => {
    // If the user is authenticated set the map to the user preferences
    // if (currentUser) {
    //   handleTheme(mapStyles[currentUser.map]);
    // }
    // eslint-disable-next-line
  }, [currentUser]);


  // Error handling when loading the map
//   if (loadError) return <CustomError message="Error loading maps" height="60" />;
  if (!isLoaded) return <div style={{ height: "90vh" }}></div>;

  return (
    <>
      {/* If there is no user render a default map */}
      {<div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          options={defaultOptions}
        >
          {/* GoogleMap component works as a context around the children */}
          {props.children}
        </GoogleMap>
      </div>}

      {/* If there is a user render a map with his preferences */}
      {<div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          options={options}
        >
          {/* GoogleMap component works as a context around the children */}
          {props.children}
        </GoogleMap>
      </div>}

    </>
  );

  // Function to handle the map theme adding google markers to it
  function handleTheme(mapTheme) {
    // Delete the property owner as it refers to the user pk
    // delete currentUser.markers.owner;

    const newTheme = [...mapTheme];

    // Loop through the object properties
    // for (const key of Object.keys(currentUser.markers)) {
    //   // Add the markers to the map if active
    //   if (1) {
    //     newTheme.push({
    //       featureType: `poi.${key}`,
    //       elementType: "all",
    //       stylers: [
    //         {
    //           visibility: "on",
    //         },
    //       ]
    //     });
    //   }
    // }
    setTheme(newTheme);
    options.styles = newTheme;
  }
}