import React,{Component} from 'react'
import { useState, useRef} from 'react';
import {Button, Input} from '@mui/material';
import { useStops } from '../../Providers/StopsContext';
import {useGeolocation} from '../../Providers/GeolocationContext'
import { reqPrediction } from '../../ajax';
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
import { parseJSON } from 'date-fns';

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
    const {data:stops} = useStops()
    console.log(stops);
    // get stop id by stop name
    const stopNameToId = (name)=>{
      var num = name.split(', ')
      for(var i = 0; i < stops.length; i++){
        var stop_number = stops[i].stop_name.split(', ')
        // stop_number = stop_number[stop_number.length - 1]
        // if(stop_number === num){
        //   return stops[i]['stop_id']
        // } 
        for(var j = 0; j < stop_number.length; j ++){
          if(num[j] === stop_number[j]){
            return stops[i]['stop_id']
          }
        }
      }
      return false
    }

    // for time picker
    const handleTimeChange = (newValue) => {
      var date = moment(newValue).format('L');
      var hour = moment(newValue).format('HH:mm:ss');
      setValue(newValue);
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

    }
    // get trip id by user input
    const showdirectionResponse = async()=>{
        console.log(directionResponse);
        // get the first recommadation route
        var RecommadationRoute = directionResponse.routes[0].legs[0].steps
        // bus trips 
        var transits = []
        // walk trips
        var walks = []
        var trip_arrival_time = time.valueOf()
        for(var i = 0; i < RecommadationRoute.length; i++){     
          var temp = RecommadationRoute[i]
          if(temp.travel_mode === 'WALKING'){
            walks.push({
              distance: temp.distance.value,
              duration: temp.duration.value,
              departure_time: time.valueOf(),
              arrival_time: time.valueOf() + (temp.duration.value * 1000),
            })
            trip_arrival_time = trip_arrival_time + (temp.duration.value * 1000)
          }
          if(temp.travel_mode === 'TRANSIT'){
            transits.push({
              duration: temp.duration.value,
              arrival_stop:temp.transit.arrival_stop.name,
              arrival_time:temp.transit.arrival_time.value,
              departure_stop:temp.transit.departure_stop.name,
              departure_time:temp.transit.departure_time.value,
              short_name:temp.transit.line.short_name,
              time: trip_arrival_time
            })
            trip_arrival_time = trip_arrival_time + (temp.duration.value * 1000)
          }
        }
        console.log(transits,'transits');
        console.log(walks,'walks');
        var temp = []
        // any bus route not found flag will be false and give a alert
        var flag = true
        // send req to server to get trip id
        for(var i = 0; i < transits.length; i++){
          if(flag){
            console.log(transits[i].arrival_stop,transits[i].departure_stop,transits[i].departure_time.valueOf(),transits[i].short_name)
            var response = await reqPrediction(stopNameToId(transits[i].arrival_stop),stopNameToId(transits[i].departure_stop),transits[i].time,transits[i].short_name)
            let {status,data} = response
            if ( status === 200){
              var {trip_id, departure_time} = data[0]
              temp.push({
                'trip_id': trip_id,
                'departure_time': departure_time
              })
              
            }else{
              flag = false
              break
            }
          }
        }
        console.log(temp,'temp');
        if(flag){
          alert((JSON.stringify(temp)))
        }else{
          alert('no bus route found')
        }
        

        
       
    }
    // clear user input
    function clearRoute(){
        setDirectionResponse(null)
        setDistance('')
        setDuration('')
        originRef.current.value = '' 
        destinationRef.current.value = ''
    }
    
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
          >Get Trip_Id</Button>

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
          onClick={()=>back(false)}
          size='small'
        >
         Back
        </Button>

         </LocalizationProvider>
         {directionResponse&&<DirectionsRenderer directions={directionResponse}></DirectionsRenderer>}
  </div>
}


export default Planner