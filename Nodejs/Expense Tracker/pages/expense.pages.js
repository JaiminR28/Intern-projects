exports.userExpensePage = (res, data) => {
	return res.status(200).render("data", {
		pageTitle: "User Expense Page",
		path: "/expense/get-user-expense",
		data: data,
	});
	// res.writeHead(302, { Location: "http://localhost:5000/auth/login" });
};

exports.addExpenseForm = (req, res) => {
	return res.status(200).render("addExpenseForm.ejs", {
		pageTitle: "Add Expense Page",
		path: "/expense/get-user-expense",
	});
};
