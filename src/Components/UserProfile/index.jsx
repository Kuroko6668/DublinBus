import { Typography } from '@mui/material';
import * as React from 'react';
import NavBar from '../NavBar';
import './style.css';
// import { useContext } from "react";



// const UserProfilePage=()=>{

//     return(
//         <div class="page">
//             <NavBar/>
//             <Typography variant="h4" component="h3" class="heading">   Hey Rick, Here is your profile! </Typography>
         
//         </div>
//     )
// }

// export default UserProfilePage;


function Userinfo({ user }) {
    return (
    

      <div>
        <NavBar/>
        <h1>Hello, {user.username}</h1>
      </div>
    );
  }
  
  export default Userinfo;