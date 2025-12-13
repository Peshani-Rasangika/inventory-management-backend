require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const runMigrations = require("./runMigrations");

const app = express();
app.use(cors());
app.use(express.json());

connectDB().then(() => {
  console.log("Database connected");

  runMigrations();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

app.get("/", (req, res) => {
  res.send("Inventory Management API running");
});

app.use("/api/products", productRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// connectDB().then(async () => {
//   await runMigrations();
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// });
