const express = require('express');
const cors = require('cors'); //import cors 
require('./db/config');
const Users = require('./db/User.js'); //User Model 
const Product = require('./db/Product.js'); //Products Model 
const app = express();
const Jwt = require('jsonwebtoken');
const JwtKey = 'e-comm';

app.use(express.json());
app.use(cors()); //this fixes the cors issue
//without this we will get an error becuase browser thinks that backend and frontend are at two different urls

// app.post("/register",async(req, res) => {
//     let user=new Users(req.body);
//     let result=await user.save();
//     res.send(result);
// })

app.post("/register", async (req, res) => {
    let user = new Users(req.body);  
    let result = await user.save();
    result = result.toObject();//converts to object
    delete result.password; //deleletes the password 
    Jwt.sign({ result }, JwtKey, { expiresIn: "2h" }, (error, token) => {
        if (error) {
            res.send({ result: "Something went wrong" });
        }
        else{
        res.send({ result, auth: token });
        }
    })
})

app.post("/login", async (req, res) => {
    console.log(req.body);
    if (req.body.password && req.body.email) { //if both Password and email are present then only data is returned
        let user = await Users.findOne(req.body).select("-password");
        //-password to remove the password field from the result which we are about to send
        if (user) {//if we find any matching data 
            //sign the token 
            Jwt.sign({ user }, JwtKey, { expiresIn: "2h" }, (error, token) => {
                if (error) {
                    res.send({ result: "Something went wrong" });
                }
                else{
                res.send({ user, auth: token }); //we are sending the user data , and the token
                }
            })

        }
        else {//if we don't find any matching data
            res.send({ result: "No user found" });
        }
        // res.send(req.body);
    }
    //if we are missing out on any data , even if its half correct 
    else { res.send({ result: "Enter correct email and password" }) }
})

app.post("/add-product", async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();

    res.send(result);
})


app.get("/products", async (req, res) => {
    let products = await Product.find();
    if (products.length > 0) {  //if there are products 
        res.send(products)
    }
    else {
        res.send({ result: "Product not found" }); //if the cart is empty 
    }
})

app.delete("/products/:id", async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id })
    res.send(result);
})


app.get("/products/:id", async (req, res) => {
    try {
        let result = await Product.findOne({ _id: req.params.id });
        if (result) {
            res.send(result); // Product found, send the product data as response
        } else {
            res.send({ result: "Product not found" }); // Product not found, send an error message
        }
    }
    catch (err) {
        res.status(500).send({ err: "Internal server error" });
    }
}
)

app.put('/products/:id', async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },  //find the id of the product that is to be updated 
        {
            $set: req.body
        }
    )
    res.send(result);
})

app.get("/search/:key", async (req, res) => {
    try {
        let result = await Product.find({
            "$or": [
                { name: { $regex: req.params.key } },
                { company: { $regex: req.params.key } },
                { category: { $regex: req.params.key } }
            ]
        })

        res.send(result);
    }
    catch (err) { res.send({ err: "Not Found" }); }
})

app.listen(5000); 