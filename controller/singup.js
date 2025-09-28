const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.singupUser=async (req,res)=>{
    const{username, email,password}=req.body;
    const userExist=await User.findOne({email});

    if(userExist){
        console.log("user Exist")
        return res.status(400).json({message:"user already exist"});
    }
    const saltRound=10;
       const hashedPassword=await bcrypt.hash(password,saltRound);
         const userCreated=await User.create({username,email,password:hashedPassword});

    return res.status(200).json({msg:userCreated});
}

module.exports.loginUser=async(req,res)=>{
    const {username,password}=req.body;
    console.log(username ,password);
    if(!username || !password){
        return res.status(400).json({message:"pls provide username and password"});
    }
    const user=await User.findOne({username});
    if(!user){
        return res.status(404).json({message:"user not found"})
    }
     const isPasswordCorrect=await bcrypt.compare(password, user.password);
    const userid=user._id;
     if(!isPasswordCorrect){
        return res.status(401).json({ message: "Invalid credentials" });
     }
        const token= jwt.sign({
            userId:user._id.toString(),
            email:user.email,  
            username:user.username,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn:"30d"
        }
    )
    res.status(200).json({ message: "Login successful", token , userid});
    
}