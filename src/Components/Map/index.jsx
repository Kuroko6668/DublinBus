import React,{Component} from 'react'
import { GoogleMap, useJsApiLoader, Marker, Autocomplete, DirectionsRenderer, TrafficLayer} from '@react-google-maps/api';
// import { Button, Tooltip, Input, Card, Space, Alert} from 'antd';
import { useState, useRef} from 'react';
import './style.css'
import {Typography, Button, Input, Box} from '@mui/material';
import { useStops } from '../../Providers/StopsContext';
import {useGeolocation} from '../../Providers/GeolocationContext'
const containerStyle = {
  width: '800px',
  height: '400px',
};
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

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_KEY,
    libraries: ["places"],
    region: 'ie',
    language: 'en'
  })

  const [map, setMap] = useState((null))
  const [marker, setMarker] = useState((null))
  const [directionResponse, setDirectionResponse] = useState((null))
  const [distance,setDistance] = useState('')
  const [duration,setDuration] = useState('')
  const originRef = useRef('')
  const destinationRef = useRef('')
  const stopsObj = useStops()
  const userLocationObj = useGeolocation()
  const {position} = userLocationObj;
  const stopsList = stopsObj.data
  const directions = useRef()
  // console.log(stopsList,userLocationObj);
  const onLoadMap = React.useCallback(function callback(map) {
    map.set('styles',customStyled)
    setMap(map)
      /* eslint-disable */
    
  }, [])
  const onLoadMarker = React.useCallback(function callback(marker) {
    setMarker(marker)
  }, [])
  const onDirectionsChanged = React.useCallback(function callback() {
    // setDirectionResponse((null))
  }, [])
  const onUnmount = React.useCallback(function callback(map) {
    setMap((null))
  }, [])

  
  async function calculateRoute (){
    
    if(originRef.current.value === '' || destinationRef.current.value === ''){
      return 
    }
    const directionsService = new google.maps.DirectionsService()
    // const bounds = new google.maps.LatLngBounds();
    // bounds.extend(new google.maps.LatLng(54,-6))
    // bounds.extend(new google.maps.LatLng(53,-7))

    // console.log(originRef, destinationRef);
    let results = await directionsService.route({
      origin:originRef.current.value,
      destination:destinationRef.current.value,
      travelMode:google.maps.TravelMode.TRANSIT,
      provideRouteAlternatives: true,
      region:'ie',
      transitOptions: {
        departureTime: new Date(Date.now()),
        modes: ['BUS'],
        routingPreference: 'FEWER_TRANSFERS'
      },
    })
    setDirectionResponse(results)
    setDistance(results.routes[0])
    // console.log(results.routes[0].legs[0].distance.text,results.routes[0].legs[0].duration.text);
    // setDirectionResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
    console.log(results.routes);
    // /* eslint-enable */
  }
  const show10BusStops = ()=>{
    console.log(directionResponse);
  }
  // const options = {
  //   imagePath:"https://github.com/googlemaps/js-marker-clusterer/tree/gh-pages/images/m1.png"
  // }

  function clearRoute(){
    setDirectionResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = '' 
    destinationRef.current.value = ''
  }


  return isLoaded ? (
    <>
      <Box 
        display="grid" 
        gridTemplateColumns="repeat(12, 1fr)" 
        gap={2}
        className="map"
      >
        <Box 
          gridColumn="span 4"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            '& .MuiTextField-root': { width: '25ch' },
          }}
        >
        <Autocomplete
        >
          <Input 
                size="middle"
                style={{width:"10rem"}}
                placeholder={"origin"}
                inputRef = {originRef}
          />
        </Autocomplete>
        <Autocomplete
        >
          <Input 
                size="middle"
                style={{width:"10rem"}}
                placeholder={"destination"}
                inputRef={destinationRef}
          />
        </Autocomplete>

        <Button 
          type="submin"
          variant='contained'
          onClick={calculateRoute}
          size='small'
        >
          Caculate Route
        </Button>

          <Button 
            size='small'
            onClick={clearRoute}
          >clear</Button>

          <Button 
            size='small'
            onClick={()=> map.panTo(position)}
          >center</Button>
          <Button 
            size='small'
            onClick={show10BusStops}
          >reqAllStops</Button>
        </Box>
        <Box gridColumn="span 8">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position}
          zoom={11}
          onLoad={onLoadMap}
          
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            position: google.maps.ControlPosition.RIGHT_CENTER
          }}
          onLoaded={(map) => setMap(map)}
        >
          {directionResponse&&<DirectionsRenderer directions={directionResponse} onDirectionsChanged={onDirectionsChanged}></DirectionsRenderer>}
          <Marker 
            key={1}
            position={{lat:53.3463, lng:-6.25541}}
            title={"Keep It Weird"}
            onLoad={onLoadMarker}
          />
          {
            stopsList&&stopsList.slice(0,110).map((stop) => (
              <Marker key={stop.stop_id} position={{lat:stop.stop_lat,lng:stop.stop_long}} />
            ))
          }
        </GoogleMap>
        </Box>
      </Box>


      <Typography 
        variant='h1'
        color='secondary'
        align='center'
      >
        {distance}{duration}
      </Typography>

      
    </>

  ) : <></>
}

export default Map