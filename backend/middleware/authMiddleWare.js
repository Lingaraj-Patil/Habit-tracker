const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            return next();
        }
        catch(error){
            console.error("Token verification Failed:",error.message);
            return res.status(401).json({message: "Not Authorised, token failed"});
        }
    }

    if(!token){
        return res.status(401).json({message: "Not authorised, no token"});
    }
})

module.exports = protect;