import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (_error) {
    res.status(500).send("Error fetching products");
  }
};

export const createProduct = async (req, res) => {
  const { name, price } = req.body || {};

  if (!name || price === undefined || price === null) {
    return res.status(400).send("Name and price are required");
  }

  if (!req.file) {
    return res.status(400).send("Product image is required");
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  const newProduct = new Product({
    name,
    price: Number(price),
    image: imageUrl,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (_error) {
    res.status(500).send("Error saving product");
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, currentImage } = req.body || {};

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid product ID!!" });
  }

  const updates = {
    name,
    price: price !== undefined ? Number(price) : undefined,
  };

  if (req.file) {
    updates.image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  } else if (currentImage) {
    updates.image = currentImage;
  }

  Object.keys(updates).forEach((key) => updates[key] === undefined && delete updates[key]);

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).send("Product not found!!");
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid product ID!!" });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product not found!!" });
    }
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (_error) {
    res.status(500).json({ success: false, message: "Server Error!!" });
  }
};
