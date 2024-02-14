const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");

const db = require("../models");
const { handleOutput } = require("../utils/outputhandler");

const User = db.User;

const generateHashPassword = async (password) => {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		return hashedPassword;
	} catch (error) {
		throw new Error(error);
	}
};

//~ GET ALL USERS
exports.getUser = async (req, res) => {
	const data = await User.findAll({});

	handleOutput(res, data, StatusCodes.OK);
};

//~ CREATE A USER
exports.createUser = async (req, res) => {
	const { username, email, password } = req.body;
	const newPassword = await generateHashPassword(password);
	await User.create({
		username: username,
		email: email,
		password: newPassword,
	})
		.then((data) => {
			return handleOutput(res, data, StatusCodes.CREATED);
		})
		.catch((err) => {
			console.log(err);
			return handleOutput(res, null, StatusCodes.EXPECTATION_FAILED);
		});
};

//~ USER WITH ID
exports.getUserWithId = async (req, res) => {
	const id = req.params["id"];
	const data = await User.findByPk(id, {
		attributes: ["id", "username", "email", "balance"],
	});

	if (data) {
		return handleOutput(res, data, StatusCodes.OK);
	}
	handleOutput(res, null, StatusCodes.NOT_FOUND);
};
