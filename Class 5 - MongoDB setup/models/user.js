import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now() },
});

const User = model("User", userSchema);

export default User;
