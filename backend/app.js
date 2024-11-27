const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const habitRoutes = require("./routes/habitRoutes");


dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/users",userRoutes)
app.use("/api/habits",habitRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`Port is listening to ${PORT}`));