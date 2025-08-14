const express=require("express");
const router=express.Router();
const wrapAsync = require("../public/util/wrapAsync.js");
const verifymiddleware=require("../middleware/authmiddileware.js");
const {validationListing}=require("../middleware/validation.js");
const { indexRoute,  showRoute, updateRoute, deleteRoute, createRoute } = require("../controller/listing.js");
const { isOwner } = require("../middleware/isOwner.js");
const multer = require("multer"); 
const {storage}=require("../cloudconfig.js");
const upload = multer({ storage }); 

//index route
router.get("/", wrapAsync(indexRoute));

 router.post("/new",verifymiddleware, upload.single("image"), validationListing,wrapAsync(createRoute));

 //show route
router.get("/:id",verifymiddleware, wrapAsync(showRoute));

//update route
router.put("/editDetail/:id",verifymiddleware, isOwner, validationListing,upload.single("listing[image]"),wrapAsync(updateRoute));

//delete route
router.delete("/deleteCard/:id",verifymiddleware,isOwner, wrapAsync(deleteRoute));

module.exports=router;