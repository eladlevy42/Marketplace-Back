const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const Buffer = require("safe-buffer").Buffer;
const connectDB = require("./config/db");

dotenv.config(); // Load config

const PORT = process.env.PORT || 3000;

async function main() {
  await connectDB(); // Connect to the database

  // Middlewares
  app.use(express.json()); // Parse JSON bodies
  app.use(cors({ origin: "http://localhost:5173" })); // Allow CORS for local development

  // Routes
  const productRoutes = require("./routes/product.route");
  app.use("/api/product", productRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main();
