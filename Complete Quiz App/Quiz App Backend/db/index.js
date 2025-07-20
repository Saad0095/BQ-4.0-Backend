import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config(); // ✅ Load .env variables

mongoose.connect(process.env.MONGO_URI)
.then("Mongoose connected successfully!")
.catch("Error connecting Mongoose!")