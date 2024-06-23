const express = require("express");

const {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
} = require("../controllers/product.controller");

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);
router.post("/", createProduct);
router.put("/", updateProduct);
module.exports = router;
