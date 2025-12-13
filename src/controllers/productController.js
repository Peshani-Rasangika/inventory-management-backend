const { sql } = require("../config/db");

// Get all products
const getProducts = async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM Products`;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await sql.query`SELECT * FROM Products WHERE id = ${id}`;
    if (result.recordset.length === 0)
      return res.status(404).json({ message: "Product not found" });
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create product
const createProduct = async (req, res) => {
  const { name, quantity, price } = req.body;
  try {
    await sql.query`INSERT INTO Products (name, quantity, price) VALUES (${name}, ${quantity}, ${price})`;
    res.status(201).json({ message: "Product created" });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: err.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity, price } = req.body;
  try {
    await sql.query`UPDATE Products SET name=${name}, quantity=${quantity}, price=${price} WHERE id=${id}`;
    res.json({ message: "Product updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await sql.query`DELETE FROM Products WHERE id=${id}`;
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
