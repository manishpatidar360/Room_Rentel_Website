const Listing = require("../models/listing");
//index route
module.exports.indexRoute=async(req,res)=>{
    const allListing= await Listing.find({})
    res.status(200).json(allListing); 
 }

 //create route
 module.exports.createRoute=async(req,res)=>{
   console.log("Received data:", req.body);
    console.log("Received file:", req.file);
     let url = req.file.path;
    let filename = req.file.filename;
    
    const owner=req.user.userId;
    const newListing=new Listing( req.body.listing);
   newListing.owner = owner;
   newListing.image = { url, filename };
   await newListing.save().then(()=> res.status(200).json(newListing)).catch((err)=>console.log(err));  
}

//show route
module.exports.showRoute=async(req,res)=>{
    const{id}=req.params;
 const listing=await Listing.findById(id).populate({path:"review", populate:{path:"reviewAuthor",select: "-password -email "}}).populate("owner","-password");
 console.log(listing);
 res.status(200).json(listing);
}

//update route
module.exports.updateRoute=async(req,res)=>{
    
    const{ title, description, image, price, location, country} =req.body;
    const{id}=req.params; 
   const result= await Listing.findByIdAndUpdate(id, { title, description, image, price, location, country} );
   res.status(200).json({ message: "Listing updated successfully"});
}

//delete route
module.exports.deleteRoute=async(req,res)=>{
   console.log("delete");
    const{id}=req.params;
   const response=await Listing.findByIdAndDelete(id);
   console.log(`delete response is ${response}`);
   res.status(200).json(response);
}
