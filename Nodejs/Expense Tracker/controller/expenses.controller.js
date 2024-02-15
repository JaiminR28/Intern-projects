const { StatusCodes } = require("http-status-codes");
const { v4: uuidv4 } = require("uuid");

const db = require("../models");

const Expense = db.expenses;
const Category = db.categories;
const User = db.User;
const sequelize = db.sequelize;

const { handleOutput } = require("../utils/outputhandler");

//~ GET ALL THE EXPENSES
exports.getAllExpense = async (req, res) => {
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

//~ ADD A NEW EXPENSE
exports.addExpense = async (req, res) => {
	try {
		const result = await sequelize.transaction(async (t) => {
			// await t.query("SET TRANSACTION ISOLATION LEVEL SERIALIZABLE");
			// await t.query("SELECT * FROM your_table FOR UPDATE");

			const { amount, description, userId, categoryId } = req.body;
			// console.log(req.body);
			// 1) Adding the expense to the table
			const newExpense = await Expense.create(
				{
					id: uuidv4(),
					amount,
					description,
					userId,
					categoryId,
				},
				{
					transaction: t,
				}
			);

			// 2) Fetching the balance of the user

			const id = newExpense.userId;
			// console.log(id);
			const userBalance = await User.findByPk(
				id,
				{
					attributes: ["balance"],
				},
				{
					transaction: t,
				}
			);

			// 3) Updating the balance
			const newBalance = userBalance.balance - amount;
			// console.log(newBalance);

			// 4) Updating the balance in the user balance
			const data = await User.update(
				{ balance: newBalance },
				{
					where: {
						id: id,
					},
				},
				{
					transaction: t,
				}
			);

			if (!data) {
				throw new Error("Could not add the Expense");
			}

			return handleOutput(res, data, StatusCodes.CREATED);
		});
	} catch (error) {
		if (
			error.message ===
			"Cannot read properties of null (reading 'balance')"
		) {
			console.error("Transaction was rolled back:", error.message);
			return handleOutput(
				res,
				null,
				StatusCodes.BAD_REQUEST,
				"User Not Found !!"
			);
		}
		return handleOutput(res, null, StatusCodes.INTERNAL_SERVER_ERROR);
	}
};

//~ GET ALL EXPENSES OF THE USER
exports.getUserExpenses = async (req, res) => {
	const id = req.user.id;
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
//? using the unmanaged transaction
exports.addMoney = async (req, res) => {
	const { amount } = req.body;

	const t = await sequelize.transaction();

	try {
		const user = req.user;

		if (!user) {
			// If user is not found, rollback the transaction
			throw new Error("Could not find the user");
		}

		const newBalance = amount + user.balance;
		console.log({ newBalance });
		const data = await User.update(
			{ balance: newBalance },
			{
				where: {
					id: user.id,
				},
			},
			{
				transaction: t,
			}
		);
		await t.commit();
		return handleOutput(res, data, StatusCodes.ACCEPTED);
	} catch (error) {
		await t.rollback();
		if (error.message === "Could not find the user")
			return handleOutput(
				res,
				null,
				StatusCodes.NOT_FOUND,
				error.message
			);

		return handleOutput(res, null, StatusCodes.INTERNAL_SERVER_ERROR);
	}
};
