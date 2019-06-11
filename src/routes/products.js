const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController")
const validation = require("./validation");

router.get("/grocery/:groceryId/products/new", productController.new);
router.post("/grocery/:groceryId/products/create", validation.validateProducts, productController.create);
router.get("/grocery/:groceryId/products/:id", productController.show);
router.post("/grocery/:groceryId/products/:id/destroy", productController.destroy);
router.get("/grocery/:groceryId/products/:id/edit", productController.edit);
router.post("/grocery/:groceryId/products/:id/update", validation.validateProducts, productController.update);

module.exports = router;