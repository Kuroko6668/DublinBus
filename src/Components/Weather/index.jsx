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
    <>
    <span><i className={icon}></i></span>
    <span class="msg">
        {props.message}
    </span>
    </>
    )
}

export default Weather;