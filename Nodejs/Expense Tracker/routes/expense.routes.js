const express = require("express");
const expenseController = require("../controller/expenses.controller");
const router = express.Router();

router
	.get("/", expenseController.getExpense)
	.post("/add-expense", expenseController.addExpense);

exports.router = router;
