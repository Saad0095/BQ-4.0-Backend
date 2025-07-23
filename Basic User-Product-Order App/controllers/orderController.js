import Order from "../models/order.js";
import Product from "../models/product.js";

export const createOrder = async (req, res) => {
  try {
    console.log(req.body);
    const { products, status, customer } = req.body;
    let total = 0;

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found!" });
      }
      // if (product.quantity < item.quantity) {
      // return res.status(400).json({ error: "Item Already Sold Out!" });
      // }
      total += product.price * item.quantity;
    }
    const order = await Order.create({ products, total, status, customer });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate(`products.productId`);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      `products.productId`
    );
    if (!order) return res.status(404).json({ error: "Order not found!" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const checkOrderStatus = async (req, res) => {
  try {
    const { status } = await Order.findById(req.params.id);
    if (!status) return res.status(404).json({ error: "Order not found!" });
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedOrder)
      return res.status(404).json({ error: "Order not found!" });
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
