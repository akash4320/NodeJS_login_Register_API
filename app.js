const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')

const userRoutes = require("./routes/userRoute");

// configraration with env. 
dotenv.config();

//middleware
app.use(express.json());
app.use(cors());
app.use("/api/user", userRoutes);

// MongoDB Connect
mongoose.connect(`${process.env.MONGODB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
 }).then((res)=> console.log('MongoDB Connected'))
 .catch((err)=> console.log('Error Connecting Mongodb'));
 
 app.listen(3002, () => {
   console.log("Server is running on port 3002");
 });
  
 module.exports = app;