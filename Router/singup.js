const express=require('express');
const wrapAsync = require('../public/util/wrapAsync');
const router=express.Router();

const { validationUser } = require('../middleware/validation');
const { singupUser, loginUser } = require('../controller/singup');

//singup user
router.post("/singup", validationUser, wrapAsync(singupUser ));

//login user
router.post("/login", wrapAsync(loginUser));

module.exports=router;