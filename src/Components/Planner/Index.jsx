import React,{Component} from 'react'
import { useState, useRef} from 'react';
import {Button, Input, Card} from '@mui/material';
import { useStops } from '../../Providers/StopsContext';
import {useGeolocation} from '../../Providers/GeolocationContext'
import { reqPrediction } from '../../ajax';
import './style.css'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import { 
  Autocomplete, 
  useGoogleMap, 
  Marker
} from '@react-google-maps/api';
import { ClassNames } from '@emotion/react';
import endpoint from '../../assets/flag.png'
import startpoint from '../../assets/pin.png'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import moment from "moment";
import ErrorMessage from '../ErrorMessage';
import DisplayRoutes from './subcomponent/DisplayRoutes';
import ja from 'date-fns/esm/locale/ja';
import { set } from 'store/dist/store.modern.min';
import { reqRouteById } from '../../ajax';
import Waiting from '../waiting';
function Planner({back}){
    const map_Ref = useGoogleMap();
    const { position } = useGeolocation();
    const [directionResponse, setDirectionResponse] = useState((null))
    const [distance,setDistance] = useState('')
    const [duration,setDuration] = useState('')
    const [display,setDisplay] = useState(false)
    const [visiableroute,setVisiableRoute] = useState([])
    const [startPoint, setstartPoint] = useState(null)
    const [endPoint, setendPoint] = useState(null)
    const originRef = useRef('')
    const destinationRef = useRef('')
    const [error,setError]=useState(false);
    const [time_error,setTimeError]=useState(false);
    const [time, setValue] = useState(new Date());
    const {data:stops} = useStops()
    const [panel, setPanel] = useState(null)
    const [pending, setPending] = useState(false)

    /* eslint-disable */
    const directionsDisplay = new google.maps.DirectionsRenderer()
    /* eslint-enable */

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
    // return bus route we have in our database
    const getbestroute = (res)=>{
 
      //输入函数体
      for (let i = 0; i < res.routes.length; i++) {
        var temp = res.routes[i].legs[0].steps;

        var flag = true
        for(var j = 0; j < temp.length; j ++){
          if(temp[j].travel_mode === 'TRANSIT'){
            if(!temp[j].transit.line.short_name){
              console.log('no line short name');
              flag = false
              break
            }
            console.log(routesName.indexOf(temp[j].transit.line.short_name.toLowerCase()));
            if(routesName.indexOf(temp[j].transit.line.short_name.toLowerCase()) === -1){
              console.log('such line not exist in our database');
              flag = false
              break
            }
          }
        }
        if(flag){
          console.log('find best route',res.routes[i].legs[0].steps);
          return res.routes[i].legs[0].steps
        }
      }
      return
    }
    // fine stops along this route to show on map
    const getRoute = async (route_name,direction_id,max_lat,max_lng,min_lat,min_lng)=>{

      let {data:route_stops} = await reqRouteById(route_name)
      route_stops.map((obj)=>{
          for(var i = 0; i < stops.length; i++){
              if(stops[i].stop_id === obj.stop_id){
                  obj.stopObj = stops[i]
              } 
          }
      })
      
      console.log(route_stops,'route_stops');
      var res = []
      for(var i = 0; i < route_stops.length; i++){
          if(route_stops[i].direction_id === direction_id &&
            route_stops[i].stopObj.stop_lat < max_lat + 0.001 &&
            route_stops[i].stopObj.stop_lat > min_lat - 0.001 &&
            route_stops[i].stopObj.stop_long < max_lng + 0.001 &&
            route_stops[i].stopObj.stop_long > min_lng - 0.001){      
              res.push(route_stops[i].stopObj)
          }
      }
      console.log(res,'visiableroute');
      return res
    }


    // for time picker
    const handleTimeChange = (newValue) => {
      var date = moment(newValue).format('L');
      var hour = moment(newValue).format('HH:mm:ss');
      if((newValue - new Date() > 7*24*3600*1000) || (newValue < new Date())){
        setTimeError(true)
      }else{
        setTimeError(false)
        setValue(newValue);
      }
    };
    // caculate the route based on user input
    async function calculateRoute (){
        if(originRef.current.value === '' || destinationRef.current.value === ''){
          return 
        }
        // if(error|| time_error){
        //   return 
        // }
        setPanel(null)
        console.log(visiableroute);
        /* eslint-disable */
        try{ 
        console.log(visiableroute);
        /* eslint-disable */
        const directionsService = new google.maps.DirectionsService()
        setDirectionResponse(null)
        setstartPoint(null)
        setstartPoint(null)
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
        // if get best route then predict and drew panel
        if(RecommadationRoute){
          setError(false);
          setDirectionResponse(RecommadationRoute)
          console.log(RecommadationRoute,'RecommadationRoute');
          setPending(true)
          await showPanel(RecommadationRoute)
          setPending(false)
          setstartPoint({lat:RecommadationRoute[0].start_point.lat(), lng:RecommadationRoute[0].start_point.lng()})
          console.log(RecommadationRoute[RecommadationRoute.length-1].end_point.lat(), RecommadationRoute[RecommadationRoute.length-1].end_point.lng());
          setendPoint({lat:RecommadationRoute[RecommadationRoute.length-1].end_point.lat(), lng:RecommadationRoute[RecommadationRoute.length-1].end_point.lng()})
        }else{
          alert('sorry we do not find bus route at this time')
        }}
       catch{
          setError(true);
          setPending(false)
        }
      

    }
    // show the result provided by google api and our machine learning prediction
    const showPanel = async(RecommadationRoute)=>{
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
              direction_id:0,
              num_stops:temp.transit.num_stops,
              trip_stops:null
            }
            var max_lat = Math.max(bus_trip.arrival_stop_lat,bus_trip.departure_stop_lat)
            var min_lat = Math.min(bus_trip.arrival_stop_lat,bus_trip.departure_stop_lat)
            var max_lng = Math.max(bus_trip.arrival_stop_lng,bus_trip.departure_stop_lng)
            var min_lng = Math.min(bus_trip.arrival_stop_lng,bus_trip.departure_stop_lng)
            console.log(bus_trip.arrival_stop_id,bus_trip.departure_stop_id,bus_trip.departure_time.valueOf(),bus_trip.short_name)
            var response = await reqPrediction(bus_trip.arrival_stop_id,bus_trip.departure_stop_id,bus_trip.departure_time.valueOf(),bus_trip.short_name)
            console.log(response);
            let {data} = response
            console.log(data[0],'response');
            if(data[0].trip_time === 0){
              bus_trip.prediction_journey_time = Math.ceil(bus_trip.duration/60)
            }else{
              bus_trip.prediction_journey_time = data[0].trip_time
            }

            if(data[0].direction_id >= 0){
              bus_trip.direction_id = data[0].direction_id 
            }
            
            temp_panel.push(bus_trip)
            console.log(bus_trip.short_name,bus_trip.direction_id,max_lat,max_lng,min_lat,min_lng);
            var route_stops = await getRoute(bus_trip.short_name,bus_trip.direction_id,max_lat,max_lng,min_lat,min_lng)
            bus_trip.trip_stops = route_stops
          }
        }
        setPanel(temp_panel)
        console.log(panel,'panel');
        return 
    }
    // clear user input
    function clearRoute(){
        setDirectionResponse(null)
        setTimeError(false)
        setTimeError(false)
        setPanel(null)
        setstartPoint(null)
        setendPoint(null)
        setValue(new Date())
        setVisiableRoute([])
        originRef.current.value = '' 
        destinationRef.current.value = ''
    }
    
  return <div id="planner">
        <Autocomplete>
          <Input 
                size="middle"
                style={{width:"10rem"}}
                placeholder={"origin"}
                inputRef = {originRef}
          />
        </Autocomplete>
        <Autocomplete>
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
          onClick={()=>{clearRoute();back()}}
          size='small'
        >
         Back
        </Button>

         </LocalizationProvider>
         {time_error && <ErrorMessage message={'time must be in next 7 days'}/>}
         {
          panel&&
          <DisplayRoutes panel={panel} route={visiableroute}/>
         }
          {startPoint&&
                <Marker
                  key={Math.random().toString()}
                  position={startPoint}
                  label="A"

                />
          }
          {endPoint&&
                <Marker
                  key={Math.random().toString()}
                  position={endPoint}
                  // icon={endpoint}
                  label="B"
                />
          }
          {pending&&

            <Card variant="margin_bottom"><Waiting size={50} thickness={3} /></Card>
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
  '14','140','142','15','150','151','155','15a',
  '15b','15d','16','16d',
  '26','27','27a','27b','27x','32x','33','33d','33e','33x','37','38','38a','38b','38d','39','39a',
  '39x','4','40','40b','40d','40e','41','41b','41c','41d','41x','42','43','44','44b','46a','46e','47','49','51d','52','53','54a','56a','6','61','65','65b','68','68a','69','69x','7','70','77a','77x',
  '79','79a','7a','7b','7d','83','83a','84','84a','84x','9','H1','H2','H3','C1','C2','C3','C4',
  'C5','C6','P29','L53','L54','L58','L59','X25','X26','X27',
  'X28','X30','X31','X32','N4',
]