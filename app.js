const express=require("express");
const app=express();
const mongoose=require("mongoose");
const port=3000;
require('dotenv').config();
// const MONGO_URL='mongodb://127.0.0.1:27017/wanderlust'
const MONGO_URL=process.env.ATLAS_URL;
const path=require("path");
const cors = require("cors");
const ExpressError = require("./public/util/ExpressError.js");
const listing = require("./Router/listing.js");
const review = require("./Router/review.js");
const singup=require('./Router/singup.js');
const payment=require('./Router/payment.js');
require("dotenv").config();
app.use(cors());

// views ejs path
app.set("views",path.join(__dirname,"/views")) 
app.use(express.urlencoded({extended:true}));
app.use(express.json());


main().then(()=>console.log("db connection successful")).catch((err)=>console.log(err));
async function main(){
    await mongoose.connect(MONGO_URL);
}




app.use("/listing", listing);
 
app.use('/payment',payment)

// reviews route


// review delete

app.use("/listing/:id/reviews",review )

app.use("/user",singup)


app.all("*",(req,res,next)=>{
    next( new ExpressError(401,"page not found"));
})

app.use((err,req,res,next)=>{
    let {status=500,message="somthing went wrong"}=err;
    console.log(`status is ${status} and m=${message}`);
    res.status(status).json({error:message});
})
app.listen(port,()=>{
    console.log('server is starting');
})