import * as React from 'react';
import Typography from '@mui/material/Typography';

import NavBar from '../NavBar';
import './style.css';


const UserStatsPage=()=>{

    return(
        <div class="page">
            <NavBar/>
            <Typography variant="h4" component="h3" class="heading">
USER STATISTICS
</Typography>
        </div>
    )
}

export default UserStatsPage;