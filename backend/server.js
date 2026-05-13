import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js"


dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

console.log("dotenv file",process.env.MONGO_URL);

app.get("/",(req,res)=>{
    res.send("Hello World");
})

const allowedOrigins = new Set([
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:4173",
    "http://127.0.0.1:4173",
]);

// Allow frontend (Vite) to call backend APIs from a different origin.
app.use((req, res, next) => {
    const origin = req.headers.origin;

    if (origin && allowedOrigins.has(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }

    res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Vary", "Origin");

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});

app.use(express.json());

app.use("/api/products",productRoutes);


app.listen(PORT,()=>{
    connectToDB();
    console.log(`Server is running on port:`+ PORT);
})

// T51tui9TjpTcXxm5
