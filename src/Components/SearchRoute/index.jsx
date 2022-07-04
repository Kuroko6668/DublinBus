import React,{Component, useRef, useState} from 'react'
import {Button, Input} from '@mui/material';
import { reqRouteById } from '../../ajax';
import DisplayStops from '../DisplayStops/index'
import { useStops } from '../../Providers/StopsContext';
import './style.css'
const SearchRoute = ()=>{
  //输入函数体
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
                    stops[i].stop_sequence = obj.stop_sequence
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
        for(var i = 0; i < route_stops.length; i++){
            if(route_stops[i].direction_id === direction){
                detail = route_stops[i].trip_headsign
                res.unshift(route_stops[i].stopObj)
            }
        }
        console.log(res);
        console.log(detail);
        setVisiableRoute(res)
        setDirectionDetail(detail)

        // const res = route_stops.filter((obj)=>{
        //     if(obj.direction_id === direction){
        //         return obj.stopObj
        //     }else{
        //         return false
        //     }
        // })
        // console.log(res);
        // setVisiableRoute(res)
    }

    const handleChangeDirection = ()=>{
        console.log(direction);
        setDirection(1^direction)


        const res = []
        var detail = ''
        for(var i = 0; i < routes.length; i++){
            if(routes[i].direction_id === direction){
                detail = routes[i].trip_headsign
                res.unshift(routes[i].stopObj)
            }
        }
        console.log(res);
        console.log(detail);
        setVisiableRoute(res)
        setDirectionDetail(detail)
        
        // console.log(direction);
        // const res = []
        // for(var i = 0; i < routes.length; i++){
        //     if(routes[i].direction_id === 1^direction){
        //         res.unshift(routes[i].stopObj)
        //     }
        // }
        // console.log(res);
        // setVisiableRoute(res)


        // const res = routes.filter((obj)=>{
        //     if(obj.direction_id === direction){
        //         return obj.stopObj
        //     }else{
        //         return false
        //     }
        // })
        // console.log(res);
        // setVisiableRoute(res)
    }
    return <div id='route'>
        <Input 
            size="middle"
            style={{width:"10rem"}}
            placeholder={"Route name, eg:39a"}
            inputRef = {routeRef}
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
        {directionDetail&&<h3>{directionDetail}</h3>}
        {/* {direction&&} */}
    </div>
}
export default SearchRoute