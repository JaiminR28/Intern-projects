const express = require("express");
const expenseController = require("../controller/expenses.controller");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

router
	.get("/", authMiddleware.sessionChecker, expenseController.getAllExpense)
	.post(
		"/add-expense",
		authMiddleware.sessionChecker,
		expenseController.addExpense
	)
	.get(
		"/get-user-expense",
		authMiddleware.sessionChecker,
		expenseController.getUserExpenses
	)
	.post(
		"/add-money",
		authMiddleware.sessionChecker,
		expenseController.addMoney
	);

exports.router = router;
