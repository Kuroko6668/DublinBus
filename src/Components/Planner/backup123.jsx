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
import NearMeSearchBar from './subcomponent/NearMeSearchBar';



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
      return 
    }

    const handleTimeChange = (newValue) => {
        var date = moment(newValue).format('L');
        var hour = moment(newValue).format('HH:mm:ss');
        setValue(newValue);
      };
    const clearRoute = ()=>{
      //输入函数体
    }
    
  return <div id="planner">
    
            <NearMeSearchBar/>
            <NearMeSearchBar/>

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