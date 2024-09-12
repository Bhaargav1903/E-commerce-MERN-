import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// if we use anchor <a> tags instead of Link the page will refresh 
const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    }
    return (
        <div>
            <img src="https://logopond.com/logos/8eaaac3a2fe79ea70f852b5c332c7efb.png" alt="logo" className="logo" />
            {auth ? <ul className="nav-ul">
                {/* These are the links which are displayed on the nav section */}
                {/* Link to be clicked */}
                <li><Link to="/">Product</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/update">Update Product</Link></li>
                <li><Link to="/profile">Profile Page</Link></li>
                <li><Link onClick={logout} to="/signup">Logout( {JSON.parse(auth).name})</Link></li>
                </ul>
                :
                <ul className="nav-ul nav-right"><li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/login">Log In</Link></li> </ul>
            }
        </div>
    )
}

export default Nav;