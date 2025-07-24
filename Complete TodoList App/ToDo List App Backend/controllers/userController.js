import User from "../models/user.js";

export const signUp = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json({ message: "User Created Successfully!", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
