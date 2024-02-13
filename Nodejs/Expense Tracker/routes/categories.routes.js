const express = require("express");
const categoryController = require("../controller/categories.controller");
const router = express.Router();

router
	.get("/", categoryController.getCategory)
	.post("/", categoryController.createCategory);

exports.router = router;
