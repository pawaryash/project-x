const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const router = express.Router();
const {isAuthenticatedUser} = require("../middlewares/auth")

router.route("/products").get(isAuthenticatedUser, getAllProducts);

//new product route
router.route("/product/new").post(createProduct);

//update a product
router.route("/product/:id").put(updateProduct);

//delete a product
router.route("/product/:id").delete(deleteProduct);

//get a single product
router.route("/product/:id").get(getProductDetails);

module.exports = router;