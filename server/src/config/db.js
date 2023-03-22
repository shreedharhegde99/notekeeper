const mongoose = require("mongoose");
require("dotenv").config();
const localDB = "mongodb://127.0.0.1/notekeeper";

async function connectDB() {
  return await mongoose
    .connect(process.env.DB_URL || localDB)
    .then(() => console.log("CONNECTED TO DATABASE"))
    .catch((e) => console.log(e.message));
}

module.exports = connectDB;
