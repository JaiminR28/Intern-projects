const express = require("express");
const authController = require("../controller/auth.controller");
const authPage = require("../pages/auth.pages");

const router = express.Router();

router
	.get("/login", authPage.loginPage)
	.post("/token", authController.fetchRefreshToken)
	.post("/login", authController.loginUser)
	.delete("/logout", authController.logout);

router.post("/create-account", authController.createAccount);

exports.router = router;
