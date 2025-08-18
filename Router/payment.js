const express=require("express");
const router=express.Router();
const wrapAsync = require("../public/util/wrapAsync.js");
const verifymiddleware=require("../middleware/authmiddileware.js");
const { createOrder, verifyPayment } = require("../controller/bookingController.js");

router.post("/order",verifymiddleware, wrapAsync(createOrder) );
router.post("/varification", verifymiddleware,wrapAsync(verifyPayment));

module.exports=router;