const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController")

router.get("/grocery/:groceryId/products/new", productController.new);
router.post("/grocery/:groceryId/products/create", productController.create);
router.get("/grocery/:groceryId/products/:id", productController.show);
router.post("/grocery/:groceryId/products/:id/destroy", productController.destroy);
router.get("/grocery/:groceryId/products/:id/edit", productController.edit);
router.post("/grocery/:groceryId/products/:id/update", productController.update);

module.exports = router;