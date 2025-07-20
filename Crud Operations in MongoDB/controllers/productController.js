import Product from "../models/product.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.msg });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(res.params.id);
    if(!product) return res.status(400).json({message: "Product Not Found!"})
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.msg });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.msg });
  }
};
