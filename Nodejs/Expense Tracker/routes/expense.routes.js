const express = require("express");
const expenseController = require("../controller/expenses.controller");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

router
	.get("/", authMiddleware.sessionChecker, expenseController.getAllExpense)
	.post("/add-expense", expenseController.addExpense)
	.get("/get-user-expense/:id", expenseController.getAllExpenses)
	.post("/add-money/:id", expenseController.addMoney);

exports.router = router;
