import React from "react";
import {Navigate,Outlet} from 'react-router-dom';

const PrivateRoute=()=>{
    const auth=localStorage.getItem('user'); //get the user data
 
   return auth?<Outlet/>:<Navigate to="/signup" />;//if the user is not logged in then redirect to signup page
}


export default PrivateRoute;