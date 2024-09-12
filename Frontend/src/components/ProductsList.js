import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ProductsList=()=> {
  const [products,setProducts]=useState([]);

  useEffect(()=>{
    getProducts();
  },[])

  const getProducts=async()=>{
    let result=await fetch ("http://localhost:5000/products") 
   
    result=await result.json();
    setProducts(result);
  }
  console.warn("ProductsList",products);

  //we can delete products here 
  const deleteProduct=async (id)=>{
   let result=await fetch (`http://localhost:5000/products/${id}`,{
    method: "Delete"
   });
   result=await result.json();
   if(result){
      getProducts();
   }
   }
 
   //we have a search handle here 
   const searchHandle=async(event)=>{
    let key=event.target.value;
    if(key){
        let result=await fetch (`http://localhost:5000/search/${key}`)
    result=await result.json(); 
    if(result){
        setProducts(result) //what ever result we are getting  set that as result
    }
    }
    else{
        getProducts();
    }
   }
    return (
    <div className='product-list'>
        <h1>Products List</h1>
        <input type="text" placeholder='Searh Product' className='searchbox' onChange={searchHandle} />
        {/* The search will change on the input field change means we don't have to use the submit button every time
        The change in state due to the useState will rerender the component again */}
        <ul>
            <li>S.No</li>
            <li>Name</li>
            <li>Price</li>
            <li>Category</li>
            <li>Company</li>
            <li>Operation</li>
        </ul>
        {
           products.length>0 ? products.map((item,index)=>
                <ul key={item._id}>
                 <li>{index+1}</li>
                 <li>{item.name}</li>
                 <li>${item.price}</li>
                 <li>{item.category}</li>
                 <li>{item.company}</li>
                 <li><button onClick={()=>deleteProduct(item._id)}>Delete</button>
                     
                     <Link className='update-link' to={"/update/"+item._id}>Update</Link>
                 </li>
                </ul>
            )
            : <h1>No Product Found</h1>
        }
    </div>
  )
}

export default ProductsList