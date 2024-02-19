const express = require("express");
const authController = require("../controller/auth.controller");
const authPage = require("../pages/auth.pages.js");
const passport = require("passport");
// const session = require("express-session");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");

router
	.get("/signup", authPage.signUpPage)
	// .get("/signup", authPage.signUpPage)
	.get("/login", authPage.loginPage)
	.post("/token", authController.fetchRefreshToken)
	.post("/login", authController.loginUser)
	.post("/logout", authController.logout)
	.post("/create-account", authController.createAccountFromCredentials);

router.get(
	"/google",
	passport.authenticate("google", {
		scope: ["email", "profile"],
		prompt: "select_account",
	})
);

// router.get(
// 	"/google/callback",
// 	passport.authenticate("google", {
// 		successRedirect: "auth/google/success",
// 		failureRedirect: "/google/failure",
// 	})
// );

// router.get("/google/failure", (req, res) => {
// 	res.render("login", {
// 		pageTitle: "Login Page",
// 		path: "/auth/login",
// 	});
// });

// router.get("/google/success", (req, res) => {
// 	console.log("success called");
// 	// let name = req.user.displayName;
// 	// console.log({ name });
// 	res.render("dashboard", {
// 		pageTitle: "Dashboard Page",
// 		path: "/dashboard",
// 	});
// });

router.get(
	"/google/callback",
	passport.authenticate("google", {
		failureRedirect: "/failed",
	}),
	function (req, res) {
		res.redirect("/success");
	}
);

// failed route if the authentication fails
// router.get("/failed", (req, res) => {
// 	console.log("User is not authenticated");
// 	res.send("Failed");
// });

// // Success route if the authentication is successful
router.get("/success", authMiddleware.isLoggedIn, (req, res) => {
	console.log("You are logged in");
	// res.send(`Welcome ${req.user.displayName}`);
	res.redirect("/");
});

exports.router = router;
