const express=require("express");
const router=express.Router({mergeParams:true});
const verifymiddleware=require("../middleware/authmiddileware.js");
const wrapAsync = require("../public/util/wrapAsync.js");
const { validationReviews } = require("../middleware/validation.js");
const { indexReview, createReview, destroyReview } = require("../controller/reviews.js");
const { isReviewOwner } = require("../middleware/isOwner.js");


// index review route
router.get("/",wrapAsync(indexReview ));
 
// create review route
router.post("/" ,verifymiddleware,validationReviews, wrapAsync(createReview));

// review delete route
router.delete("/:reviewId",verifymiddleware,isReviewOwner,wrapAsync(destroyReview ))

module.exports=router;