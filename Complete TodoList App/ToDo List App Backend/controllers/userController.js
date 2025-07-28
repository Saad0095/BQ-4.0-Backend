import User from "../models/user.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered!s" });
    }
    const user = await User.create({name, email, password});
    res.json({ message: "User Created Successfully!", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
