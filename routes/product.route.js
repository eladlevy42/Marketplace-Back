const express = require("express");

const {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  getProductsCount,
} = require("../controllers/product.controller");

const router = express.Router();
router.get("/count", getProductsCount);
router.get("/", getProducts);
router.post("/", createProduct);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

module.exports = router;
