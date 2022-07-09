import React,{Component, useRef, useState} from 'react'
import {Button, Input, Typography, Card, CardActions, CardContent, Box, Autocomplete, TextField} from '@mui/material';
import { reqRouteById } from '../../ajax';
import DisplayStops from '../DisplayStops/index'
import { useStops } from '../../Providers/StopsContext';
import './style.css'
import StopsTable from './StopsTable';



const SearchRoute = ()=>{
    const [value, setValue] = React.useState(routesName[0]);
    const [inputValue, setInputValue] = React.useState('');
    const routeRef = useRef('')
    const [routes,setRoutes] = useState(null)
    const [routeInfo,setRouteInfo] = useState(null)
    const [visiableroute,setVisiableRoute] = useState(null)
    const {data:stops}  = useStops();
    const [direction, setDirection] = useState(0)
    const [directionDetail, setDirectionDetail] = useState('')

  
    const getRoute = async ()=>{
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

    const handleChangeDirection = ()=>{


        const res = []
        var detail = ''
        var index = 1
        for(var i = 0; i < routes.length; i++){
            if(routes[i].direction_id === 1^direction){
                detail = routes[i].trip_headsign
                // routes[i].stopObj.stop_sequence = routes[i].stop_sequence
                routes[i].stopObj.stop_sequence = index++
                res.push(routes[i].stopObj)
            }
        }
        console.log(res);
        console.log(detail);
        setDirection(1^direction)
        setVisiableRoute(res)
        setDirectionDetail(detail)

    }
    return <div id='route'>
        <Autocomplete
        getOptionLabel={(option) => option.value}
        renderOption={(props, option) => {
            return (
              <li {...props} key={option.key}>
                {option.value}
              </li>
            );
          }}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={res}
        sx={{ width: "12rem" }}
        renderInput={(params) => <TextField {...params} label="Route Name" inputRef = {routeRef}/>}
        />
        <Button 
          sx={{ mt:1 }}
          style={{textTransform: 'none'}}
          type="submin"
          variant='contained'
          onClick={getRoute}
          size='small'
        >
          Search by Route
        </Button>

        <Button 
          sx={{ mt:1 }}
          style={{textTransform: 'none'}}
          onClick={handleChangeDirection}
          size='small'
        >
          Change Direction
        </Button>
        {visiableroute&&<DisplayStops stops={visiableroute}/>}
        {directionDetail&&
            <Typography sx={{ fontSize: 14 }} gutterBottom>
                {directionDetail}
            </Typography>
        }
        {visiableroute&&<StopsTable stops={visiableroute}/>}


    </div>
}
export default SearchRoute


var routesName = [
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
function unique (arr) {
  return Array.from(new Set(arr))
}
routesName = unique(routesName)
let res = []
for(var i = 0; i < routesName.length; i ++){
    var obj = new Object(true)
    obj.key = Math.random().toString()
    obj.value = routesName[i]
    res.push(obj)
}
