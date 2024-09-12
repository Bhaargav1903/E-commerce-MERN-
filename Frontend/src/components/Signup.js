import React, { useEffect } from 'react'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';


const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate=useNavigate();

  useEffect(()=>{
      const auth=localStorage.getItem('user');
      if(auth){
          navigate('/'); //will go to only home page
      }
  },[navigate])

   const collectData = async () => {
    console.warn(name, email, password);
    //for fecthing data we must wait for the data fetching so use aync await
    let result = await fetch("http://localhost:5000/register", {
      method: "POST",    //we will use POST method to save data in database
      body: JSON.stringify({ name, email, password }),  //converts the input into string so it can send it to tha database
      headers: {
        "Content-Type": "application/json"
      },
    });
    result = await result.json();
    console.warn(result);
    //This also returns a promise so use await
    //this result again has to be converted into string using .json() method
    localStorage.setItem("user", JSON.stringify(result));
    localStorage.setItem("token",JSON.stringify(result.auth));
    if(result){//if the user has signed up redirect to home page
        navigate('/'); //this navigate , is used to redirect the user to the home page ,if they are signed up
    }
  }
  return (
    <div className='Signup'>
      <h1>Sign Up Page</h1>
      <input className='inputbox' type="text"
        value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter name' />
      <input className='inputbox' type="email"
        value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter email' />
      <input className='inputbox' type="password"
        value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' />
      <button onClick={collectData} className='button' type='button'>Sign Up</button>
    </div>
  )
}

export default Signup