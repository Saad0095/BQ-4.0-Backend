const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/geoPractice');
  console.log("MongoDB connected");
};

module.exports = connectDB;
