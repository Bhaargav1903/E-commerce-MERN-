import React, { useEffect, useState } from 'react'
import { useParams ,useNavigate} from 'react-router-dom';

const UpdateProduct=()=> {
    const [name, setName] = React.useState();
    const [price, setPrice] = React.useState();
    const [category, setCategory] = React.useState();
    const [company, setCompany] = React.useState();
    const params=useParams();
    const navigate=useNavigate();

    useEffect(()=>{
       getProductDetails();
    },[])

    const getProductDetails= async ()=>{
        console.warn(params);
        let result=await fetch(`http://localhost:5000/products/${params.id}`)
        result=await result.json();  //first gets the data from DB
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateProduct=async()=>{
        console.warn(name,price,category,company);
        let result=await fetch(`http://localhost:5000/products/${params.id}`,{
            method: 'PUT',
            body: JSON.stringify({name,price,category,company}),
            headers:{
                'Content-Type': 'application/json'
            }
        });

        result=await result.json();
        console.warn(result);
        navigate('/');
    }
  return (
    <div className="product">
            <h1>Update Product</h1>
            <input type="text" placeholder="Enter Product Name" className="pinputbox"
                value={name} onChange={(e) => { setName(e.target.value) }} />
              
                
            <input type="text" placeholder="Enter Product Price" className="pinputbox"
                value={price} onChange={(e) => { setPrice(e.target.value) }} />
               
            <input type="text" placeholder="Enter Product Category" className="pinputbox"
                value={category} onChange={(e) => { setCategory(e.target.value) }} />
               
            <input type="text" placeholder="Enter Product Company" className="pinputbox"
                value={company} onChange={(e) => { setCompany(e.target.value) }} />
                 
            <button onClick={updateProduct} className="pbutton">Update Product</button>
        </div>
  )
}

export default UpdateProduct