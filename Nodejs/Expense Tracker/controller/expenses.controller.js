const { StatusCodes } = require("http-status-codes");
const { v4: uuidv4 } = require("uuid");

const db = require("../models");

const Expense = db.expenses;
const Category = db.categories;
const User = db.User;

const { handleOutput } = require("../utils/outputhandler");

exports.getExpense = async (req, res) => {
	const data = await Expense.findAll({
		include: [
			{
				model: Category,
				as: "category",
				required: true,
			},
			{
				model: User,
				attributes: ["id", "username", "email"],
				as: "User",
			},
		],
	});

	return handleOutput(res, data, StatusCodes.OK);
};

exports.addExpense = async (req, res) => {
	const { amount, description, userId, categoryId } = req.body;
	console.log(req.body);
	const data = await Expense.create({
		id: uuidv4(),
		amount,
		description,
		userId,
		categoryId,
	});

	handleOutput(res, data, StatusCodes.CREATED);
};
