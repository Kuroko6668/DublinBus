import React,{Component, useRef, useState} from 'react'
import {Button, createFilterOptions, Input, Typography, Card, CardActions, CardContent, Box, Autocomplete, TextField} from '@mui/material';
import { useStops } from '../../../../Providers/StopsContext';
import DisplayStops from '../../../DisplayStops';
import { useGoogleMap } from '@react-google-maps/api';

// use to set label limit of autocomplete
const defaultFilterOptions = createFilterOptions();
const OPTIONS_LIMIT = 10;
const filterOptions = (options, state) => {
    return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
};


const NearMeSearchBar = ()=>{
  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState('');
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
  </div>
}
export default NearMeSearchBar



