const express = require("express");
const categoryController = require("../controller/categories.controller");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

router
	.get("/", authMiddleware.authenticateToken, categoryController.getCategory)
	.post(
		"/",
		authMiddleware.authenticateToken,
		categoryController.createCategory
	);

exports.router = router;
