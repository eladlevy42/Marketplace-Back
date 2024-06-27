const Product = require("../models/products.model");
// const PRODUCTS = require("../data/products.json");
const { raw } = require("express");

async function getProductsCount(req, res) {
  const name = req.query.name || "";

  try {
    const count = await Product.countDocuments({
      name: { $regex: name, $options: "i" }, // "i" for case-insensitive
    });
    res.json({ count });
  } catch (err) {
    console.log(
      "Product.controller, getProductsCount. Error while getting Products count",
      err
    );
    res.status(500).json({ message: err.message });
  }
}
function criteria(req) {
  const name = req.params.name || "";
  const page = req.query.page || 1;
  const minPrice = parseFloat(req.query.minPrice) || 0;
  const maxPrice = parseFloat(req.query.maxPrice) || Infinity;
  return {
    page,
    name: {
      $regex: name,
      $options: "i",
    },
    price: {
      $gte: minPrice,
      $lte: maxPrice,
    },
  };
}
async function getProducts(req, res) {
  const criteriaObj = criteria(req);

  try {
    const products = await Product.find({
      name: criteriaObj.name,
      price: criteriaObj.price,
    })
      .skip(criteriaObj.page * 10)
      .limit(10);
    res.json(products);
  } catch (err) {
    console.log(
      "product.controller.getProducts error while getiing products: " +
        err.message
    );
  }
}

async function getProductById(req, res) {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.json(product);
  } catch (err) {
    if (err.name === "CastError") {
      console.log(
        `product.controller, getProducyById. Product not found with id: ${id}`
      );
      return res.status(404).json({ message: "Product not found" });
    }

    console.log(
      `product.controller, getproductById. Error while getting product with id: ${id}`,
      err.name
    );
    res.status(500).json({ message: err.message });
  }
}
async function deleteProduct(req, res) {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      console.log(
        `product.controller, deleteproduct. product not found with id: ${id}`
      );
      return res.status(404).json({ message: "product not found" });
    }
    res.json({ message: "product deleted" });
  } catch (err) {
    console.log(
      `product.controller, deleteproduct. Error while deleting product with id: ${id}`
    );
    res.status(500).json({ message: err.message });
  }
}

async function createProduct(req, res) {
  const productToAdd = req.body;
  console.log(productToAdd);
  const newProduct = new Product(productToAdd);

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.log(
      `product.controller, createProduct. Error while creating product: ${err.message}`
    );
    if (err.name === "ValidationError") {
      console.log(`product.conteoller, createProduct. ${err.message}`);
      res.status(400).json({ message: err.message });
    } else {
      console.log(`product.conteoller, createProduct. ${err.message}`);
      res.status(500).json({ message: "Server error while creating product" });
    }
  }
}

async function updateProduct(req, res) {
  const { id } = req.params;
  const { name, price, quantity, category } = req.body;

  try {
    const updateProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, quantity, category },
      { new: true, runValidators: true }
    );

    if (!updateProduct) {
      console.log(
        `product.controller, updateProduct. product not found with id: ${id}`
      );
      return res.status(404).json({ message: "product not found" });
    }
    res.json(updateProduct);
  } catch (err) {
    console.log(
      `product.controller, updateproduct. Error while updating product with id: ${id}`,
      err
    );

    if (err.name === "ValidationError") {
      // Mongoose validation error
      console.log(`product.controller, updateproduct. ${err.message}`);
      res.status(400).json({ message: err.message });
    } else {
      // Other types of errors
      console.log(`product.controller, updateproduct. ${err.message}`);
      res.status(500).json({ message: "Server error while updating product" });
    }
  }
}

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  getProductsCount,
};
