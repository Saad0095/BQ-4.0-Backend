import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost:27017/Practice")
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));