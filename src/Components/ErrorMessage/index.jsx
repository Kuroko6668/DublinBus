import React from 'react';
import './style.css';


function ErrorMessage({message}){
    return(
        <div class="msg"> {message}</div>
    )
}

export default ErrorMessage;