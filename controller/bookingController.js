const Razorpay = require("razorpay");
const crypto = require("crypto");
const Listing = require("../models/listing");
const Booking = require("../models/dashbord");

module.exports.createOrder=async(req,res)=>{
    try{
    const { listing_id}=req.body;
    const data= await Listing.findById( listing_id);

     const totalAmount = data.price *100;

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

      const options = {
      amount: totalAmount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };
     const order = await razorpay.orders.create(options);
     res.json({ order, key:process.env.RAZORPAY_KEY_ID, });

}catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//varify payment 

module.exports.verifyPayment = async (req, res) => {
    console.log("response");
    console.log(req.body);
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      listing_id
    } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");
       if (generatedSignature === razorpay_signature) {
          const newBooking= new Booking({
            username:req.user.username,
             paymentId:razorpay_payment_id,
             roomID:listing_id,
             status:"booked",
          })
           await newBooking.save();
            const result=await Listing.findByIdAndUpdate(listing_id,{status:"Booked"},{ new: true } );
            console.log("result"); 
            console.log(result);
          return res.json({ success: true, message: "Payment verified & booking successful" });
       }else {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment verification failed" });
  }
}