const jwt=require('jsonwebtoken');

const authmiddileware=(req,res,next)=>{
    const token= req.headers.authorization;;

    if(!token){
        return res.status(401).json({msg:"Access denied. No token provided."})
    }

    const jwtToken= token.replace("Bearer","").trim();

    try{
        const isVerified=jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        console.log(isVerified);
        req.user=isVerified;
        next();
    }catch(err){
         return res.status(403).json({message:"invailid or expired token"});
    }
}

module.exports=authmiddileware;