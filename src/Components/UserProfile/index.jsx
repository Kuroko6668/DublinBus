import { Typography } from '@mui/material';
import * as React from 'react';
import NavBar from '../NavBar';
import './style.css';


const UserProfilePage=()=>{

    return(
        <div class="page">
            <NavBar/>
            <Typography variant="h4" component="h3" class="heading">   Hey Rick, Here is your profile! </Typography>
         
        </div>
    )
}

export default UserProfilePage;