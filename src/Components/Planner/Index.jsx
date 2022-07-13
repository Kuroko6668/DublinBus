import React,{Component} from 'react'
import { useState, useRef} from 'react';
import {Button, Input} from '@mui/material';
import { useStops } from '../../Providers/StopsContext';
import {useGeolocation} from '../../Providers/GeolocationContext'
import './style.css'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import { 
  Autocomplete, 
  useGoogleMap, 
  DirectionsRenderer,
} from '@react-google-maps/api';
import { ClassNames } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// C:/Users/35383/Documents/BusRepo/DublinBusRepo/src/context/AuthContext.js





const Planner = ()=>{
    const map = useGoogleMap();
    const { position } = useGeolocation();
    const [directionResponse, setDirectionResponse] = useState((null))
    const [distance,setDistance] = useState('')
    const [duration,setDuration] = useState('')
    const originRef = useRef('')
    const destinationRef = useRef('')
    const directions = useRef()
    const [time, setValue] = React.useState(new Date());




    const handleTimeChange = (newValue) => {
      setValue(newValue);
      console.log(time)
    };
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
            departureTime: time,
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
          sx={{ mt:1 }}
          style={{textTransform: 'none'}}
          type="submin"
          variant='contained'
          onClick={calculateRoute}
          size='small'
        >
          Caculate Route
        </Button>

          <Button 
            style={{textTransform: 'none'}}
            sx={{ mt:1 }}
            size='small'
            onClick={clearRoute}
          >clear</Button>

          <Button 
            style={{textTransform: 'none'}}
            size='small'
            sx={{ mt:1}}
            onClick={()=> map.panTo(position)}
          >center</Button>
          <Button 
            style={{textTransform: 'none'}}
            sx={{ m:1}}
            size='small'
            onClick={showdirectionResponse}
          >APIresponse</Button>

        <LocalizationProvider dateAdapter={AdapterDateFns} sx={{ margin:1 }}>
          <DateTimePicker
            label="Date Time picker"
            value={time}
            onChange={handleTimeChange}
            renderInput={(params) => <TextField {...params} />}
            />
         </LocalizationProvider>
         {directionResponse&&<DirectionsRenderer directions={directionResponse}></DirectionsRenderer>}
  </div>
}


export default Planner