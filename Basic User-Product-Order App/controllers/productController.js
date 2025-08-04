import Product from "../models/product.js";
import { uploadImage } from "../utils/cloudinary.js";

export const getAllProducts = async (req, res) => {
  try {
    const {
      category,
      brand,
      search,
      inStock,
      minPrice,
      maxPrice,
      minRating,
      sortBy = "name",
      order = "asc",
      pageNumber = 1,
      pageSize = 5,
    } = req.query;

    const filter = {};

    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (inStock !== undefined) filter.inStock = inStock === "true";

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (minRating) filter.rating = { $gte: Number(minRating) };

    const sort = {};
    sort[sortBy] = order === "desc" ? -1 : 1;

    const skip = (parseInt(pageNumber) - 1) * pageSize;

    const totalProducts = await Product.countDocuments();

    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(pageSize));

    console.log("Filter: ", filter);
    console.log("Sort", sort);
    console.log("Skip", skip);
    console.log("Total Products Number", totalProducts);
    console.log("Final Products", products);

    res.json({
      totalProducts,
      foundProducts: products.length,
      pageNumber: parseInt(pageNumber),
      products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product Not Found!" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    const images = req.files;

    if (!images || images.length === 0)
      return res
        .status(400)
        .json({ error: "Atleast One Product Image is required!" });

    productData.images = await Promise.all(
      images.map((image) => uploadImage(image.path))
    );

    const product = await Product.create(productData);
    res.json(product);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};
