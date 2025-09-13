
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/chat3hr';
export const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';
export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

export async function connectDB() {
  mongoose.set('strictQuery', true);
  await mongoose.connect(MONGO_URI, { dbName: undefined });
  console.log('[DB] connected');
}
