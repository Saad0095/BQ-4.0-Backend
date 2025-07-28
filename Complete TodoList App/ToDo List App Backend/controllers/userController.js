import User from "../models/user.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered!s" });
    }
    const user = await User.create({ name, email, password });
    res.status(201).json({ message: "User Created Successfully!", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Email or Password!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Email or Password!" });
    }

    res.status(201).json({ message: "User Logged In Successfully!", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
