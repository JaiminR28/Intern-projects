const { StatusCodes } = require("http-status-codes");
const { handleOutput } = require("../utils/outputhandler");
const bcrypt = require("bcryptjs");

const db = require("../models");
const jwt = require("jsonwebtoken");

const User = db.User;

// const SESSIONS = new Map();
// TODO: this array of Refresh tokens can be created inside a database or a redis cache also
let refreshTokens = [];

const generateHashPassword = async (password) => {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		return hashedPassword;
	} catch (error) {
		throw new Error(error);
	}
};

function generateAccessToken(user) {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "1min",
	});
}

exports.logout = (req, res) => {
	refreshTokens.filter((token) => token !== req.body.token);
	return handleOutput(res, { message: "User logged Out !!" }, StatusCodes.OK);
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

//~ REFRESH TOKEN
exports.fetchRefreshToken = (req, res) => {
	const refreshToken = req.body.token;

	if (!refreshToken) return handleOutput(res, null, StatusCodes.UNAUTHORIZED);
	if (!refreshTokens.includes(refreshToken))
		return handleOutput(res, null, StatusCodes.FORBIDDEN);

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
		if (err) return handleOutput(res, null, StatusCodes.FORBIDDEN);

		const accessToken = generateAccessToken(user);
		return handleOutput(res, { accessToken }, StatusCodes.OK);
	});
};

//~ LOGGING IN USER
exports.loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const foundUser = await User.findOne({ where: { email: email } });

		// console.log(foundUser);

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
			const accessToken = generateAccessToken(foundUser.dataValues);

			const refreshToken = jwt.sign(
				foundUser.dataValues,
				process.env.REFRESH_TOKEN_SECRET
			);

			refreshTokens.push(refreshToken);

			return res.json({ accessToken: accessToken, refreshToken });
		}
	} catch (error) {
		console.log({ error });
	}
};

// exports.loginUser = async (req, res) => {
// 	try {
// 		// 1) If session already present then tell them they are already logged In
// 		console.log({
// 			userSession: req.session.user,
// 			cookies: req.cookies.user_Id,
// 		});

// 		if (req.session.user) {
// 			return handleOutput(
// 				res,
// 				null,
// 				StatusCodes.OK,
// 				"You are already Logged In"
// 			);
// 		}

// 		// 2) If session expired or not present then login the user
// 		const { email, password } = req.body;
// 		const foundUser = await User.findOne({ where: { email: email } });

// 		if (!foundUser) {
// 			return handleOutput(
// 				res,
// 				null,
// 				StatusCodes.UNAUTHORIZED,
// 				"Could Not Find the User !! Please Sign Up"
// 			);
// 		}

// 		const isValidPassword = await bcrypt.compare(
// 			password,
// 			foundUser.password
// 		);

// 		// console.log(isValidPassword);
// 		if (isValidPassword) {
// 			req.session.user = foundUser; // Create new session here
// 			return handleOutput(
// 				res,
// 				{ userValid: "Logged In Successfully" },
// 				StatusCodes.OK
// 			);
// 		} else {
// 			return handleOutput(
// 				res,
// 				null,
// 				StatusCodes.UNAUTHORIZED,
// 				"Invalid Password"
// 			);
// 		}
// 	} catch (error) {
// 		console.log(error);
// 	}
// };
