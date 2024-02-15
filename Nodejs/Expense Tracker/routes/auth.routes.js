const express = require("express");
const authController = require("../controller/auth.controller");

const router = express.Router();

router.post("/login", authController.loginUser);
router.post("/create-account", authController.createAccount);
exports.router = router;
