const mongoose=require("mongoose");
const Reviews = require("./reviews");
const User=require("./user");

const listingSchema=new mongoose.Schema({
 title:{
    type:String,
    require:true
 },
 description:String,
 image:{
    url: String,
       filename: String,
 },
 price:Number,
 location:String,
 country:String,
 review:[
   {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Reviews"
   }
 ],
 owner:
 {
   type:mongoose.Schema.Types.ObjectId,
   ref:"User"
 }
})

listingSchema.post("findOneAndDelete", async(listing)=>{
   if(listing){
      await Reviews.deleteMany({_id : {$in: listing.review}});
   }
})

const Listing=mongoose.model("Listing", listingSchema);
module.exports =Listing;