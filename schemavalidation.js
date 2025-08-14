const joi=require('joi');

 const listingSchema=joi.object({
    title:joi.string().required(),
    description:joi.string().required(),
    location:joi.string().required(),
    country:joi.string().required(),
    price:joi.number().required().min(0),
     image:joi.any()
})

const reviewSchema=joi.object({
    rating:joi.number().required(),
    comment:joi.string().required()
})

const usersSchema=joi.object({
   username:joi.string().required(),
   email:joi.string().required(),
   password:joi.string().required() 
})

module.exports={listingSchema,reviewSchema, usersSchema};
