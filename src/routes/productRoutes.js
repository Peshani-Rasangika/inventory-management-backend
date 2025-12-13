const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// CRUD endpoints
router.get("/", getProducts); // Get all products
router.get("/:id", getProductById); // Get one product
router.post("/", createProduct); // Add product
router.put("/:id", updateProduct); // Update product
router.delete("/:id", deleteProduct); // Delete product

module.exports = router;
