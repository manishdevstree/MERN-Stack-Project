import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/", upload.single("image"), createProduct);

router.patch("/:id", upload.single("image"), updateProduct);

router.delete("/:id", deleteProduct);

export default router;
