const express = require("express");
const categoryController = require("../controller/categories.controller");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

router
	.get("/", authMiddleware.sessionChecker, categoryController.getCategory)
	.post(
		"/",
		authMiddleware.sessionChecker,
		categoryController.createCategory
	);

exports.router = router;
