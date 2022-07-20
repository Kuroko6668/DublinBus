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
import moment from "moment";
import ErrorMessage from '../ErrorMessage';
function Planner({back}){
    
    const map = useGoogleMap();
    const { position } = useGeolocation();
    const [directionResponse, setDirectionResponse] = useState((null))
    const [distance,setDistance] = useState('')
    const [duration,setDuration] = useState('')
    const originRef = useRef('')
    const destinationRef = useRef('')
    const directions = useRef()
    const [time, setValue] = React.useState(new Date());
    const [error,setError]=useState(false);




    const handleTimeChange = (newValue) => {
      var date = moment(newValue).format('L');
      var hour = moment(newValue).format('HH:mm:ss');
      setValue(newValue);
      console.log(time,"time")
      console.log(date,"date");
      console.log(hour,"hour");
    };
    async function calculateRoute (){

       
        if(originRef.current.value === '' || destinationRef.current.value === ''){
          return 
        }
        /* eslint-disable */
        try{ 
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
          setError(false);
            setDirectionResponse(results)
            setDistance(results.routes[0].legs[0].distance.text)
            setDuration(results.routes[0].legs[0].duration.text)
          }
       catch{
          setError(true);
        }
      

    }
    const showdirectionResponse = ()=>{
        console.log(directionResponse);
    }
    function clearRoute(){
        setDirectionResponse(null)
        setError(false);
        setDistance('')
        setDuration('')
        originRef.current.value = '' 
        destinationRef.current.value = ''
        back(false)
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

   {error&& <ErrorMessage message={"Invalid input. Please enter a valid stop"}></ErrorMessage>}

          <Button 
            style={{textTransform: 'none'}}
            sx={{ mt:1 }}
            size='small'
            onClick={clearRoute}
          >clear</Button>

          {/* <Button 
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
          >APIresponse</Button> */}

        <LocalizationProvider dateAdapter={AdapterDateFns} sx={{ margin:1 }}>
          <DateTimePicker
            label="Date Time picker"
            value={time}
            onChange={handleTimeChange}
            renderInput={(params) => <TextField {...params} />}
            />
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
          sx={{ mt:1 }}
          style={{textTransform: 'none'}}
          type="submin"
          variant='contained'
          onClick={()=>clearRoute()}
          size='small'
        >
         Back
        </Button>

         </LocalizationProvider>
         {directionResponse&&<DirectionsRenderer directions={directionResponse}></DirectionsRenderer>}
  </div>
}


export default Planner