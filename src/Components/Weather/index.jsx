import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './style.css';

/**
 * 
 * @param {*} props Icon,Message
 * @returns Weather component which displays the Weather prediction.
 */

function Weather(props){

    // If no icon is passed as props a default icon will be show.
    var icon="fa fa-sun-o";
    if(props.icon){
     icon=props.icon;
    }
    return(
    <div class="weatherContainer">
    <div><i className={icon}></i></div>
    <div class="msg">
        The current weather in Dublin is {props.temperature}°C and the wind speed is {props.wind} Km/hr.
    </div>
    </div>
    )
}

export default Weather;