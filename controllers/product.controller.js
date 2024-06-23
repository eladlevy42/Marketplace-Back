const fs = require("fs");
const PRODUCTS = require("../data/products.json");
const { raw } = require("express");

function getProducts(req, res) {
  res.status(200).json(PRODUCTS);
}

function getProductById(req, res) {
  const { id } = req.params;
  const product = PRODUCTS.find((product) => {
    return product._id === id;
  });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json(product);
}

function deleteProduct(req, res) {
  const { id } = req.params;

  const products = [...PRODUCTS];
  const productIndex = products.findIndex((product) => {
    return product._id === id;
  });

  if (productIndex === -1) {
    return res.status(404).json({ message: "product not found" });
  }

  products.splice(productIndex, 1);

  fs.writeFileSync("./data/products.json", JSON.stringify(products));
  res.status(200).json({ message: "Item deleted" });
}

function createProduct(req, res) {
  const products = [...PRODUCTS];
  //   const newProduct = {
  //     _id: makeId(),
  //     name: name,
  //     price: price,
  //     category: category,
  //   };
  products.push(req.body);
  fs.writeFileSync("./data/products.json", JSON.stringify(products));
  res.status(200).json({ message: "Item added" });
}

function makeId() {
  while (true) {
    const newId = Math.random().toString(36).substr(2, 9);
    const products = PRODUCTS;
    const productIndex = products.findIndex((product) => {
      return product._id === newId;
    });
    if (productIndex === -1) {
      return newId;
    }
  }
}

function updateProduct(req, res) {
  const products = [...PRODUCTS];
  const newProduct = req.body;
  const productIndex = products.findIndex((product) => {
    return product._id === newProduct._id;
  });
  if (productIndex === -1) {
    return res.status(404).json({ message: "product not found" });
  }
  products[productIndex] = newProduct;
  fs.writeFileSync("./data/products.json", JSON.stringify(products));
  res.status(200).json({ message: "Item updated" });
}

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
