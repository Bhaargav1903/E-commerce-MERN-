import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login=()=>{
    const navigate=useNavigate();
    const [email,setEmail]=React.useState('');
    const [password,setPassword]=React.useState('');

     useEffect(()=>{
        const auth=localStorage.getItem('user'); //if the auth is set we can log in 
        if(auth){
            navigate("/");
        }
        //otherwise we won't go to the home page 
     },[])

    const handleLogin=async()=>{
        console.warn("email,password",email,password);
        let result=await fetch('http://localhost:5000/login',{
            method:"POST",
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        result= await result.json();  //if the result has an auth token 
        if(result.auth){  //then only set the local storage
            //if we et the auth token (JSON web token )
            //store that in the local storage 
            localStorage.setItem("user",JSON.stringify(result.user)); //key value pair 
            localStorage.setItem("token",JSON.stringify(result.auth))
            navigate("/"); //navigate to home page 
        }
        else{
            alert("Please enter valid details");
        }

    }
    return (
        <div className="login">
            <h1 style={{textAlign:"center"}}>Log In</h1>
          <input type="text" className="inputbox" placeholder="Enter Email" 
          onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
          {/* As soon as we start typing in the input box the changes will occur */}

          <input type="password" className="inputbox" placeholder="Enter Password"
          onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
          <button onClick={handleLogin}  className='button loginbutton' type='button'>Login</button>
        </div>
    )
}

export default Login;