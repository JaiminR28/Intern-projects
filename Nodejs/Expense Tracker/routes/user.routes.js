const express = require("express");
const userController = require("../controller/user.controller");

const router = express.Router();

router
	.get("/", userController.getUser)
	.get("/:id", userController.getUserWithId);

exports.router = router;
