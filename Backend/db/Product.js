const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({  //we define a schema 
    name:String,
    price:String,
    category:String,
    userId:String,
    company:String
});

//collection is nothing but like a table name ,
//documents we can say it as rows of the table / Collection 
//collection name, schema
module.exports= mongoose.model("products",productSchema); //from the schema we create a model , which is a collection