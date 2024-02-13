const express = require("express");
const expenseController = require("../controller/expenses.controller");
const router = express.Router();

router
	.get("/", expenseController.getExpense)
	.post("/add-expense", expenseController.addExpense)
	.get("/get-user-expense/:id", expenseController.getAllExpenses)
	.post("/add-money/:id", expenseController.addMoney);

exports.router = router;
