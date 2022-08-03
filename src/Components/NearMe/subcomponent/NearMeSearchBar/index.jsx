import React,{Component, useRef, useState} from 'react'
import {Button, createFilterOptions, Input, Typography, Card, CardActions, CardContent, Box, Autocomplete, TextField} from '@mui/material';
import { useStops } from '../../../../Providers/StopsContext';
import DisplayStops from '../../../DisplayStops';
import { useGoogleMap } from '@react-google-maps/api';
import ErrorMessage from '../../../ErrorMessage';
// use to set label limit of autocomplete
const defaultFilterOptions = createFilterOptions();
const OPTIONS_LIMIT = 10;
const filterOptions = (options, state) => {
    return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
};


const NearMeSearchBar = ()=>{
  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState('');
  const [error,setError]=useState(false);
  var {data:stops} = useStops()
  const stopRef = useRef()
  const [visibleStops, setVisibleStops] = useState(null);
  const mapRef = useGoogleMap()

  // use to format the label
  const formatLabel = (arr)=>{
    var res = []
    for(var i = 0; i < arr.length; i ++){
        var obj = new Object(true)
        obj.key = arr[i]['stop_id']
        obj.value = arr[i]['stop_name']
        res.push(obj)
    }
    return res
  }
  const res = formatLabel(stops)

  return <div>
    <Autocomplete
        filterOptions={filterOptions}
        getOptionLabel={(option) => option.value}
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
        renderInput={(params) => <TextField {...params} label="Stop Name" inputRef = {stopRef}/>}
        />
        <Button 
          sx={{ mt:1 }}
          style={{textTransform: 'none'}}
          type="submin"
          variant='contained'
          onClick={()=>{
            if(!stopRef.current.value){
              setError(true)
              return
            }
            for (var i=0 ; i < stops.length;i++){
                if(stops[i].stop_name === stopRef.current.value){
                    setError(false)
                    setVisibleStops([stops[i]])
                    mapRef.panTo({lat:stops[i].stop_lat,lng:stops[i].stop_long})
                    return
                }
            }
            
          }}
          size='small'
        >
          Show on the map
        </Button>
        {error&&<ErrorMessage message={'choose right stop name'}></ErrorMessage>}
        {visibleStops&&<DisplayStops stops={visibleStops}/>}
        
  </div>
}
export default NearMeSearchBar



