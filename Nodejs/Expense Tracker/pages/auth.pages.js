exports.signUpPage = (req, res) => {
	res.render("signup", {
		pageTitle: "Signup Page",
		path: "/auth/signup",
	});
	// res.send("Signup");
};

exports.loginPage = (req, res) => {
	res.render("login", {
		pageTitle: "Login Page",
		path: "/auth/login",
	});
	// res.writeHead(302, { Location: "http://localhost:5000/auth/login" });
};
