const mongoose=require("mongoose");

const reviewSchema=new mongoose.Schema({
    comment:{
        type:String,
        require:true
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    reviewAuthor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

const Reviews= mongoose.model("Reviews", reviewSchema);

module.exports=Reviews;