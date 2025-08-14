const Listing = require("../models/listing");
const Reviews = require("../models/reviews");

module.exports.isOwner=async(req,res,next)=>{
    console.log('is');
    const{id}=req.params;

    const listing=await Listing.findById(id);
    console.log(listing);
    if(!listing.owner.equals(req.user.userId)){
        return res.status(401).json({message:" you dont have permission "});
    }
    next();
}

module.exports.isReviewOwner=async(req,res,next)=>{
    const{reviewId}=req.params;
    const review=await Reviews.findById(reviewId);
    if(!review.reviewAuthor.equals(req.user.userId)){
        return res.status(401).json({message:"you dont have permission"});
    }
    next();
}