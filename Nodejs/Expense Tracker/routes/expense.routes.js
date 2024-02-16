const express = require("express");
const expenseController = require("../controller/expenses.controller");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

router
	.get("/", authMiddleware.authenticateToken, expenseController.getAllExpense)
	.post(
		"/add-expense",
		authMiddleware.authenticateToken,
		expenseController.addExpense
	)
	.get(
		"/get-user-expense",
		authMiddleware.authenticateToken,
		expenseController.getUserExpenses
	)
	.post(
		"/add-money",
		authMiddleware.authenticateToken,
		expenseController.addMoney
	);

exports.router = router;
