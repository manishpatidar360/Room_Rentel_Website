const { required, date, ref } = require("joi");
const mongoose=require("mongoose");
const Listing=require('./listing');

const dashboardSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
   bookedAt:{
        type:Date,
        default:Date.now()
    },
      paymentId:{
        type:String,
        required:true
      },
    roomID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Listing"
    },
    status:{
        type:String,
        default:"Available"
    }  
});

const Booking= mongoose.model("Booking",dashboardSchema);

module.exports=Booking;