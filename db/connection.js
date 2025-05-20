const MongoClient = require("mongodb").MongoClient;

const dotenv = require("dotenv");
dotenv.config(); //load info from .env

const url = process.env.MONGODB_URI; //hide the real infomation

let db;

async function connectToDb() {
  try {
    const client = await MongoClient.connect(url); // for MongoDB new v. 4 up
    db = client.db("cse341_activity"); // mangoDB db name
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
}

function getDb() {
  return db;
}

module.exports = { connectToDb, getDb };
