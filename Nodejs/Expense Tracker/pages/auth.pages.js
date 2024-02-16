exports.loginPage = (req, res) => {
	res.render("login", {
		pageTitle: "Login Page",
		path: "/auth/login",
	});
};
