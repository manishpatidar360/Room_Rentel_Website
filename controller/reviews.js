const Listing = require("../models/listing");
const Reviews = require("../models/reviews");

// get reviews 
module.exports.indexReview=async(req,res)=>{
    const allListing= await Listing.find({})
 //    console.log(allListing);
    res.status(200).json(allListing); 
 }

// create review route
module.exports.createReview=async(req,res)=>{
    const{id}=req.params;
    const{rating, comment}=req.body;
   const listing= await Listing.findById(id);
    const reviewResult= new Reviews({rating,comment});
    reviewResult. reviewAuthor=req.user.userId;
      console.log(`review result is ${reviewResult}`);
    listing.review.push(reviewResult);
    
    await listing.save();
   let response= await reviewResult.save();
   response= await response.populate({path:"reviewAuthor", select:"-password -email "})
    console.log(`new review saved${response}`);
    res.json(response);
}

// delete review route
module.exports.destroyReview=async(req,res)=>{
    const{id, reviewId}=req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {review: reviewId}});
    await Reviews.findByIdAndDelete(reviewId);
    console.log("review deleted");
    res.send("review deleted");
}