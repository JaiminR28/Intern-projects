const { StatusCodes } = require("http-status-codes");
const { handleOutput } = require("../utils/outputhandler");
const bcrypt = require("bcryptjs");

const db = require("../models");

const User = db.User;

// const SESSIONS = new Map();

const generateHashPassword = async (password) => {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		return hashedPassword;
	} catch (error) {
		throw new Error(error);
	}
};

//TODO: Create a constraint for unique userName
//~ CREATE ACCOUNT
exports.createAccount = async (req, res) => {
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

exports.loginUser = async (req, res) => {
	try {
		// 1) If session already present then tell them they are already logged In
		console.log({
			userSession: req.session.user,
			cookies: req.cookies.user_Id,
		});

		if (req.session.user) {
			return handleOutput(
				res,
				null,
				StatusCodes.OK,
				"You are already Logged In"
			);
		}

		// 2) If session expired or not present then login the user
		const { email, password } = req.body;
		const foundUser = await User.findOne({ where: { email: email } });

		if (!foundUser) {
			return handleOutput(
				res,
				null,
				StatusCodes.UNAUTHORIZED,
				"Could Not Find the User !! Please Sign Up"
			);
		}

		const isValidPassword = await bcrypt.compare(
			password,
			foundUser.password
		);

		// console.log(isValidPassword);
		if (isValidPassword) {
			req.session.user = foundUser; // Create new session here
			return handleOutput(
				res,
				{ userValid: "Logged In Successfully" },
				StatusCodes.OK
			);
		} else {
			return handleOutput(
				res,
				null,
				StatusCodes.UNAUTHORIZED,
				"Invalid Password"
			);
		}
	} catch (error) {
		console.log(error);
	}
};
