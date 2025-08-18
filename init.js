const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const { deleteMany } = require("./models/reviews.js");
const MONGO_URL='mongodb+srv://manishpatidar5519:lE2jFs6nTbDsSCvI@cluster0.h7jqspb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

main().then(()=>console.log("db connection successful")).catch((err)=>console.log(err));
async function main(){
    await mongoose.connect(MONGO_URL);
   await initdb();
}
const initdb=async()=>{
const result=await Listing.updateMany(
   { status: { $exists: false } },
  { $set: { status: "Available" } } // default value set kar do
);
}




