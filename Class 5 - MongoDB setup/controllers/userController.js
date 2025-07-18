import User from "../models/user.js";

// Create
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read All
export const getAllUsers = async (_req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

// Read One
export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(400).json({ error: "User not found." });
  res.status(200).json(user);
};

// Update
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) return res.status(400).json({ error: "User not found." });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete
export const deleteUser = async (req, res) => {
  try {
    const removed = await User.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(400).json({ error: "User not found." });
    res.status(200).json({ message: "User removed successfully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
