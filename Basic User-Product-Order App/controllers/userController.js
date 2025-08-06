import jwt from "jsonwebtoken";
import User from "../models/user.js";

const generateToken = async (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const register = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered!" });
    }
    const user = await User.create(req.body);

    const token = await generateToken(user._id, user.role);
    res.json({ message: "User created successfully!", user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    console.log(existingUser);

    if (!existingUser) {
      return res.json({ message: "User not found!" });
    }

    const isMatch = await existingUser.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Email or Password!" });

    const token = await generateToken(existingUser._id, existingUser.role);
    res.json({ message: "User LoggedIn successfully!", existingUser, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    if (!users || users.length == 0)
      return res.status(404).json({ error: "users not found!" });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
