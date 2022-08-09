import React,{Component} from 'react'
import { useState, useRef} from 'react';
import './style.css'
import {Typography, Button, Input, Box} from '@mui/material';
import { useStops } from '../../Providers/StopsContext';
import {useGeolocation} from '../../Providers/GeolocationContext'
import { 
  GoogleMap, 
  useJsApiLoader, 
  Marker, 
  Autocomplete, 
  DirectionsRenderer, 
} from '@react-google-maps/api';

// CSS Styles for the container
const containerStyle = {
  width: '100%',
  height: '800px',
  position:'relative !important',
    display: 'flex',
  flexDirection: 'column',
  // alignItems: 'center',

  
  // display: 'flex',
  // flexDirection: 'row',

  // TO DO - find a way to add this to make mobile responsive
  // @media (max-width: 800px) {
  //   .flex-container {
  //     flex-direction: column;
  //   }
  // }
};
// Map Styles for the container
const customStyled = [
  {
    featureType: "all",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
  ]},{
    featureType: "road",
    elementType: "labels",
    stylers: [
      { visibility: "on" }
    ]},{
      featureType: "transit.station.bus",
      elementType: "labels",
      stylers: [
        { visibility: "on" }
    ]}
]
const GOOGLE_KEY = "AIzaSyDx7hqNSGl-APJh5HalGhaCqHrfpF84jKc";
// Map Options for the container
const defaultOptions = {
  zoomControl: false,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  // position: google.maps.ControlPosition.RIGHT_CENTER
}

function Map(props) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_KEY,
    libraries: ["places"],
    region: 'ie',
    language: 'en'
  })

  const [map, setMap] = useState((null))
  const [marker, setMarker] = useState((null))
  useStops();
  useGeolocation();

  const userLocationObj = useGeolocation()
  const {position} = userLocationObj;

  const onLoadMap = React.useCallback(function callback(map) {
    map.set('styles',customStyled)
    setMap(map)
      /* eslint-disable */
    
  }, [])
  const onUnmount = React.useCallback(function callback(map) {
    setMap((null))
  }, [])

  
  if (!isLoaded) return <div style={{ height: "90vh" }}>Waiting...</div>;

  return (
    <>
      <GoogleMap
      mapContainerStyle={containerStyle}
          center={position}
          zoom={11}
          onLoad={onLoadMap}
          options={defaultOptions}
          onLoaded={(map) => setMap(map)}
          onUnmount={onUnmount}
        >
          {props.children}
        </GoogleMap>
      
    </>

  ) 
}

export default Map