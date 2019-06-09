const express = require("express");
const router = express.Router();

const groceryController = require("../controllers/groceryController")

router.get("/grocery", groceryController.index);
router.get("/grocery/new", groceryController.new);
router.post("/grocery/create", groceryController.create);
router.get("/grocery/:id", groceryController.show);
router.post("/grocery/:id/destroy", groceryController.destroy);
router.get("/grocery/:id/edit", groceryController.edit);
router.post("/grocery/:id/update", groceryController.update);

module.exports = router;