const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler"); 
const bcrypt = require("bcrypt");

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'});
}

const registerUser = asyncHandler(async(req,res) => {
    const { name,email,password } = req.body;

    if(!name || !email || !password){
        return res.status(400).json({message:"Please fill in the details"})
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }


    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
        return res.status(400).json({message:"User already Exists"});
        }
        const user = await User.create({ name,email,password});
        if(user){
            res.status(200).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id)
        })
        } 
        else{
            res.status(401).json({message:"Invalid user data!"});
        }
    }
    catch(err){
        res.status(500).json({message:"server error", error: err.message});
    } 
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            return res.status(200).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id),
            });
        }

        return res.status(400).json({ message: "Invalid password or email" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


module.exports = { registerUser,loginUser };
