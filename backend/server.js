import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app =express();

console.log("dotenv file",process.env.MONGO_URL);

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.use(express.json());

app,get("api/products",async (req,res)=>{
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).send("Error fetching products");
    }
})

app.post("/api/products",async (req,res)=>{
    const product = req.body;
    if(!product.name || !product.price){
        return res.status(400).send("Name and price are required");
    }
    const newProduct = new Product(product);
    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).send("Error saving product");
    }
})

app.delete("/api/products/:id",async (req,res)=>{
    const { id } = req.params;
    console.log("Deleting product with id:", id);
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if(!deletedProduct){
            return res.status(404).send("Product not found!!");
        }
        res.status(200).json({success: true, message: "Product deleted successfully"}, deletedProduct);
    } catch (error) {
        res.status(400).json({success: false, message: "Product not found!!"});
    }
})

app.listen(5000,()=>{
    connectToDB();
    console.log("Server is running on port 5000");
})

// T51tui9TjpTcXxm5