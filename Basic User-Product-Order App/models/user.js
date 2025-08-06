import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import { roles } from "../constants/roles.js";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: roles,
      default: "customer",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async (userPassword) => {
  return await bcrypt.compare(userPassword, this.password);
};

const User = model("User", userSchema);
export default User;
