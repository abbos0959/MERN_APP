const express = require("express");
const router = express.Router();

const productController = require("../controller/productController");
router.route("/product").post(productController.createProduct);
router.route("/products").get(productController.getAllProducts);

router.route("/product/:id").get(productController.getByIdPRoduct);

module.exports = router;
