const express = require("express");
const expenseController = require("../controller/expenses.controller");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

const expensePage = require("../pages/expense.pages");

router
	.get("/", authMiddleware.authenticateToken, expenseController.getAllExpense)
	.get("/add-expense", authMiddleware.isLoggedIn, expensePage.addExpenseForm)
	.post(
		"/add-expense",
		authMiddleware.isLoggedIn,
		expenseController.addExpense
	)
	.get(
		"/get-user-expense",
		// authMiddleware.isLoggedIn,
		expenseController.getUserExpenses
	)
	.post(
		"/add-money",
		authMiddleware.authenticateToken,
		expenseController.addMoney
	);

exports.router = router;
