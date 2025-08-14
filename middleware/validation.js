const {listingSchema, reviewSchema, usersSchema} = require("../schemavalidation.js");
const ExpressError = require("../public/util/ExpressError.js");

module.exports.validationListing=(req,res,next)=>{
    const result= listingSchema.validate(req.body);
        console.log(result);
        if(result.error){
            throw new ExpressError(400, result.error)
        }else{
            next();
        }
};

module.exports.validationReviews=(req,res,next)=>{
    const result=reviewSchema.validate(req.body);
    if(result.error){
        throw new ExpressError(400, result.error);
    }else{
        next();
    }
}

module.exports.validationUser=(req,res,next)=>{
    const result=usersSchema.validate(req.body);
    console.log(result);
    if(result.error){
        throw new ExpressError(400, result.error)
    }else{
        next();
    }

}
