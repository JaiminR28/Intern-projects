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

//~ GET ALL EXPENSES OF THE USER
exports.getAllExpenses = async (req, res) => {
	const id = req.params["id"];
	console.log({ id });
	const data = await User.findByPk(id, {
		attributes: ["id", "username", "balance"],
		include: [
			{
				model: Expense,
				attributes: ["amount", "description"],
				include: [
					{
						model: Category,
						attributes: ["name"],
						as: "category",
						required: true,
					},
				],
			},
		],
	});

	return handleOutput(res, data, StatusCodes.OK);
};

//~ ADD BALANCE

exports.addMoney = async (req, res) => {
	const id = req.params["id"];
	const { amount } = req.body;

	const user = await User.findByPk(id, {
		attributes: ["balance"],
	});

	if (user) {
		const newBalance = amount + user.balance;
		const data = await User.update(
			{ balance: newBalance },
			{
				where: {
					id: id,
				},
			}
		);

		return handleOutput(res, data, StatusCodes.ACCEPTED);
	}

	return handleOutput(res, null, StatusCodes.ACCEPTED);
};
