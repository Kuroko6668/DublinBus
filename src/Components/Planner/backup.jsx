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
    const [value, setValue] = React.useState(routesName[0]);
    const [inputValue, setInputValue] = React.useState('');
    const routeRef = useRef('')
    const [routes,setRoutes] = useState(null)
    const [routeInfo,setRouteInfo] = useState(null)
    const [visiableroute,setVisiableRoute] = useState(null)
    const {data:stops}  = useStops();
    const [direction, setDirection] = useState(0)
    const [directionDetail, setDirectionDetail] = useState('')
    const [time, setValue] = React.useState(new Date());


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
    const getRoute = async ()=>{
      setVisiableRoute([])
      if(routeRef.current.value === ''){
          return 
      }
      let {data:route_stops} = await reqRouteById(routeRef.current.value)
      route_stops.map((obj)=>{
          for(var i = 0; i < stops.length; i++){
              if(stops[i].stop_id === obj.stop_id){
                  obj.stopObj = stops[i]
              } 
          }
      })
      
      setRoutes(route_stops)
      setDirection(route_stops[0].direction_id)
      // setDirectionDetail([route_stops[0].trip_headsign,route_stops[route_stops.length-1].trip_headsign])
      console.log(route_stops[0].trip_headsign,route_stops[route_stops.length-1].trip_headsign);
      console.log(route_stops);
      console.log(directionDetail);
      

      const res = []
      var detail = ''
      var index = 1
      for(var i = 0; i < route_stops.length; i++){
          if(route_stops[i].direction_id === direction){
              detail = route_stops[i].trip_headsign
              // route_stops[i].stopObj.stop_sequence = route_stops[i].stop_sequence
              route_stops[i].stopObj.stop_sequence = index++
              res.push(route_stops[i].stopObj)
          }
      }
      console.log(res);
      console.log(detail);
      setVisiableRoute(res)
      setDirectionDetail(detail)

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


// export default Planner