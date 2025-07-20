import Order from "../models/order.js";

export const postOrder = async (req, res) => {
  try {
    const product = await Order.create(req.body);
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.msg });
  }
};