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
} from '@react-google-maps/api';
import { ClassNames } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import moment from "moment";
import DisplayRoutes from './subcomponent/DisplayRoutes';
import ja from 'date-fns/esm/locale/ja';
import { set } from 'store/dist/store.modern.min';

function Planner({back}){
    const routePolyline = React.useRef();
    const planner_map = useGoogleMap();
    const { position } = useGeolocation();
    const [directionResponse, setDirectionResponse] = useState((null))
    const [display,setDisplay] = useState(false)
    const [duration,setDuration] = useState('')
    const originRef = useRef('')
    const destinationRef = useRef('')
    const directions = useRef()
    const [time, setValue] = React.useState(new Date());
    const {data:stops} = useStops()
    const [panel, setPanel] = useState(null)
    const [journey_time, setJourneyTime] = useState([])
    /* eslint-disable */
    const directionsDisplay = new google.maps.DirectionsRenderer()
    /* eslint-enable */
    // console.log(stops);
    // get stop id by stop name
    const stopNameToId = (name,lat,lng)=>{
      var num = name.split(', ')
      if(num.length === 2){
        for(var i = 0; i < stops.length; i++){
          var stop_number = stops[i].stop_name.split(', ')
          if(stop_number[1] === num[1] ){
            return stops[i]['stop_id']
          }
        }
      }
      return stoplocationToId(lat,lng)
    }
    const stoplocationToId = (lat,lng)=>{
      lat = lat * 1000
      lng = lng * 1000
    
      for(var i = 0; i < stops.length; i++){
        var stop_lat = stops[i].stop_lat
        var stop_lng = stops[i].stop_long
        
        stop_lat = stop_lat * 1000
        stop_lng = stop_lng * 1000
        // console.log(stop_lat,stop_lng,'^^^^^^^');
        if(Math.abs(lat - stop_lat)< 1 && Math.abs(lng - stop_lng)< 1 ){
          console.log('*********');
          return stops[i]['stop_id']
        }
      }
      return false
    }
    const getbestroute = (res)=>{
      console.log(res,13232445);
      //输入函数体
      for (let i = 0; i < res.routes.length; i++) {
        var temp = res.routes[i].legs[0].steps;
        console.log(temp,123);
        var flag = true
        for(var j = 0; j < temp.length; j ++){
          if(temp[j].travel_mode === 'TRANSIT'){
            console.log(routesName.indexOf(temp[j].transit.line.short_name.toLowerCase()));
            if(routesName.indexOf(temp[j].transit.line.short_name.toLowerCase()) === -1){
              console.log(123);
              flag = false
              break
            }
          }
        }
        if(flag){
          return res.routes[i].legs[0].steps
        }
      }
      return
    }
    const getTransit = (RecommadationRoute)=>{
      var transits = []
      for(var i = 0; i < RecommadationRoute.length; i++){     
        var temp = RecommadationRoute[i]
        if(temp.travel_mode === 'TRANSIT'){
          transits.push({
            duration: temp.duration.value,
            arrival_stop:temp.transit.arrival_stop.name,
            arrival_time:temp.transit.arrival_time.value,
            departure_stop:temp.transit.departure_stop.name,
            departure_time:temp.transit.departure_time.value,
            short_name:temp.transit.line.short_name,
          })
        }
      }
      console.log(transits,'transits');
      return transits
    }
    const getWalking = (RecommadationRoute)=>{
      var walks = []
      for(var i = 0; i < RecommadationRoute.length; i++){     
        var temp = RecommadationRoute[i]
        if(temp.travel_mode === 'WALKING'){
          walks.push({
            distance: temp.distance.value,
            duration: temp.duration.value,
            instructions: temp.instructions,
          })
        }
      }
      console.log(walks,'waljs');
      return walks
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
        setPanel(null)
        setJourneyTime([])
        /* eslint-disable */
        const directionsService = new google.maps.DirectionsService()
        setDirectionResponse(null)
        
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
        var RecommadationRoute = getbestroute(results)
        setPanel(null)
        setJourneyTime([])
        if(RecommadationRoute){
          setDirectionResponse(RecommadationRoute)
          console.log(RecommadationRoute,'RecommadationRoute');
          showPanel(RecommadationRoute)  
        }else{
          console.log('no bus route');
          alert('no bus route')
        }
        /* eslint-enable */
    }
    // get trip id by user input
    const showPanel = async(RecommadationRoute)=>{
        // get the first recommadation route
        // console.log(RecommadationRoute);
        var temp_panel = []
        for(var i = 0; i < RecommadationRoute.length; i++){     
          var temp = RecommadationRoute[i]
          if(temp.travel_mode === 'WALKING'){
            temp_panel.push({
              travel_mode:temp.travel_mode,
              distance: temp.distance.value,
              duration: temp.duration.value,
              instructions: temp.instructions,
             
            })
          }
          if(temp.travel_mode === 'TRANSIT'){
            var bus_trip = {
              travel_mode:temp.travel_mode,
              duration: temp.duration.value,
              distance: temp.distance.value,
              arrival_stop:temp.transit.arrival_stop.name,
              arrival_stop_lat:temp.transit.arrival_stop.location.lat(),
              arrival_stop_lng:temp.transit.arrival_stop.location.lng(),
              arrival_stop_id:stopNameToId(temp.transit.arrival_stop.name,temp.transit.arrival_stop.location.lat(),temp.transit.arrival_stop.location.lng()),
              arrival_time:temp.transit.arrival_time.value,
              arrival_time_text:temp.transit.arrival_time.text,
              departure_stop:temp.transit.departure_stop.name,
              departure_stop_id:stopNameToId(temp.transit.departure_stop.name,temp.transit.departure_stop.location.lat(),temp.transit.departure_stop.location.lng()),
              departure_stop_lat:temp.transit.departure_stop.location.lat(),
              departure_stop_lng:temp.transit.departure_stop.location.lng(),
              departure_time:temp.transit.departure_time.value,
              departure_text:temp.transit.departure_time.text,
              short_name:temp.transit.line.short_name,
              long_name:temp.transit.line.name,
              num_stops:temp.transit.num_stops,
            }
            console.log(bus_trip.arrival_stop_id,bus_trip.departure_stop_id,bus_trip.departure_time.valueOf(),bus_trip.short_name);
            var response = await reqPrediction(bus_trip.arrival_stop_id,bus_trip.departure_stop_id,bus_trip.departure_time.valueOf(),bus_trip.short_name)
            let {status,data} = response
            console.log(data[0],'response');
            if(data[0].trip_time === 0){
              bus_trip.prediction_journey_time = Math.ceil(bus_trip.duration/60)
            }else{
              bus_trip.prediction_journey_time = data[0].trip_time
            }
            
            temp_panel.push(bus_trip)
          }
        }
        setPanel(temp_panel)
        console.log(panel,'panel');
    }
    // clear user input
    function clearRoute(){
        setDirectionResponse(null)
        setPanel(null)
        directionsDisplay.setDirections({routes:[]})
        directionsDisplay.setMap(null)
        directionsDisplay.setPanel(null)
        // setDirectionResponse(null)
        setDisplay(false)
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

          {/* <Button 
            style={{textTransform: 'none'}}
            size='small'
            sx={{ mt:1}}
            onClick={()=> planner_map.panTo(position)}
          >center</Button>
          <Button 
            style={{textTransform: 'none'}}
            sx={{ m:1}}
            size='small'
            onClick={showPanel}
          >Get Trip_Id</Button> */}

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
         {
          panel&&
          <DisplayRoutes panel={panel}/>
         }
        
  </div>
}


export default Planner


const routesName = [
  '1','11','116','120','122','123','13',
  '130','14','140','142','15','15d','150',
  '155','151','15a','15b','16','16d','26','27',
  '27a','27b','27x','32x','33','33d','33e','33x',
  '37','38','38a','38b','38d','39','39a','39x','4',
  '40','40b','40d','40e','41','41b','41c','41d','41x',
  '42','43','44','44b','46a','46e','47','49','51d','52',
  '53','54a','56a','6','61','65','65b','68','68a','69',
  '69x','7','7a','70','77a','77x','79','79a','7b','7d',
  '83','83a','84','84a','84x','9','H1','H2','H3','C1','C2','C3',
  'C4','C5','C6','P29','L53','L54','L58','L59','X25','X26','X27','X28',
  'X30','X31','X32','N4','1','11','116','120','122','123','13','130',
  '14','140','142','145','15','150','151','155','15a',
  '15b','15d','16','16d',
  '26','27','27a','27b','27x','32x','33','33d','33e','33x','37','38','38a','38b','38d','39','39a',
  '39x','4','40','40b','40d','40e','41','41b','41c','41d','41x','42','43','44','44b','46a','46e','47','49','51d','52','53','54a','56a','6','61','65','65b','68','68a','69','69x','7','70','77a','77x',
  '79','79a','7a','7b','7d','83','83a','84','84a','84x','9','H1','H2','H3','C1','C2','C3','C4',
  'C5','C6','P29','L53','L54','L58','L59','X25','X26','X27',
  'X28','X30','X31','X32','N4'
]