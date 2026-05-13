import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req,res)=>{
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).send("Error fetching products");
    }
}

export const createProduct = async (req,res)=>{
    const product = req.body;
    if(!product.name || product.price === undefined || product.price === null){
        return res.status(400).send("Name and price are required");
    }
    const newProduct = new Product(product);
    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).send("Error saving product");
    }
}

export const updateProduct = async (req,res)=>{
    const { id } = req.params;
    const updates = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid product ID!!"});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        );
        if(!updatedProduct){
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
}

export const deleteProduct = async (req,res)=>{
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid product ID!!"});
    }
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if(!deletedProduct){
            return res.status(404).json({success: false, message: "Product not found!!"});
        }
        res.status(200).json({success: true, message: "Product deleted successfully"});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error!!"});
    }
}
