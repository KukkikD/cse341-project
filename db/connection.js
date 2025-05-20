const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); //load info from .env

const url = process.env.MONGODB_URI; //my mongoDB URL (code to hide the real infomation)

async function connectToDb() {
  try {
    await mongoose.connect(url, {
      //useNewUrlParser: true, // node.js ver 4.0 dosen't effect this code 
     // useUnifiedTopology: true,// node.js ver 4.0 dosen't effect this code 
      dbName: "cse341_activity", // my DB name
    });
    console.log("✅ Connected to MongoDB with Mongoose");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
}

module.exports = { connectToDb };