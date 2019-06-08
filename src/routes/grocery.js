const express = require("express");
const router = express.Router();

const groceryController = require("../controllers/groceryController")

router.get("/grocery", groceryController.index);

module.exports = router;