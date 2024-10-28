const mongoose = require("mongoose");

async function connect_to_DB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Connection failed:", error.message);
  }
}

module.exports = connect_to_DB;
