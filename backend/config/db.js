const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongoDB Connected Successfully")
    }
    catch(error){
        console.error("Error connecting to mongoDB:",error.message);
    }
}

module.exports = connectDB;
