import React from "react";
import { useState } from "react";

const AddProduct = () => {
    const [name, setName] = React.useState();
    const [price, setPrice] = React.useState();
    const [category, setCategory] = React.useState();
    const [company, setCompany] = React.useState();
    const [error,setError]=React.useState();
    //we use error so that we don't submit an empty form 

    //  this for reseting the form after submitting
    const resetForm = () => {
        setName("");
        setPrice("");
        setCategory("");
        setCompany("");
        setError(false);
    };

    const addProduct=async()=>{
        if(!name || !price || !category|| !company){
            setError(true);
            return false;
        }
       
        console.warn(name, price,category,company);
        const userId=JSON.parse(localStorage.getItem('user'))._id;
        let result=await fetch("http://localhost:5000/add-product",{
            method: 'POST',
            body: JSON.stringify ({name,price,category,company}),
            headers:{
                "Content-Type": "application/json"
            }
        });
        result=await result.json();
        console.warn(result);

        resetForm(); //reset the form to be empty , so we can enter new data 
        
    }

    return (
        <div className="product">
            <h1>Add Product</h1>
            <input type="text" placeholder="Enter Product Name" className="pinputbox"
                value={name} onChange={(e) => { setName(e.target.value) }} />
                {error && !name && <span className="invalid">Enter Valid Name</span>}
                
            <input type="text" placeholder="Enter Product Price" className="pinputbox"
                value={price} onChange={(e) => { setPrice(e.target.value) }} />
                {error && !price && <span className="invalid">Enter Valid Price</span>}
            <input type="text" placeholder="Enter Product Category" className="pinputbox"
                value={category} onChange={(e) => { setCategory(e.target.value) }} />
                {error && !category && <span className="invalid">Enter Valid Category</span>}
            <input type="text" placeholder="Enter Product Company" className="pinputbox"
                value={company} onChange={(e) => { setCompany(e.target.value) }} />
                 {error && !company && <span className="invalid">Enter a Valid Company</span>}
            <button onClick={addProduct} className="pbutton">Add Product</button>
        </div>
    )
}

export default AddProduct;