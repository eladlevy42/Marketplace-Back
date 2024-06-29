const mongoose = require("mongoose");

// Create a schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);
const productDb = mongoose.connection.useDb("products"); // Replace 'productsDatabase' with your actual database name
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
