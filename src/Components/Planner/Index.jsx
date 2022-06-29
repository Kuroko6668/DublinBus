import React,{Component} from 'react'
import { useState, useRef} from 'react';
import {Button, Input} from '@mui/material';
import { useStops } from '../../Providers/StopsContext';
import {useGeolocation} from '../../Providers/GeolocationContext'
import './style.css'
import { 
  Autocomplete, 
  useGoogleMap, 
} from '@react-google-maps/api';
import { ClassNames } from '@emotion/react';


const Planner = ()=>{
    const map = useGoogleMap();
    const { position } = useGeolocation();
    const [directionResponse, setDirectionResponse] = useState((null))
    const [distance,setDistance] = useState('')
    const [duration,setDuration] = useState('')
    const originRef = useRef('')
    const destinationRef = useRef('')
    const directions = useRef()
    async function calculateRoute (){
        if(originRef.current.value === '' || destinationRef.current.value === ''){
          return 
        }
        /* eslint-disable */
        const directionsService = new google.maps.DirectionsService()
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
        /* eslint-enable */
        setDirectionResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
        console.log(results.routes);
    }
    const showdirectionResponse = ()=>{
        console.log(directionResponse);
    }
    function clearRoute(){
        setDirectionResponse(null)
        setDistance('')
        setDuration('')
        originRef.current.value = '' 
        destinationRef.current.value = ''
      }
    
  //输入函数体
  return <div id="planner">
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
            onClick={showdirectionResponse}
          >reqAllStops</Button>
  </div>
}


export default Planner