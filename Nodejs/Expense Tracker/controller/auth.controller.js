const { StatusCodes } = require("http-status-codes");
const { handleOutput } = require("../utils/outputhandler");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

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
	const { id, role } = user;
	const subject = { id, role };
	return jwt.sign(subject, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "1min",
	});
}

exports.logout = (req, res) => {
	// refreshTokens = refreshTokens.filter((token) => token !== req.body.token);\
	console.log({ session: req.session });
	console.log({ cookies: req.cookies });

	// req.session.destroy((err) => {
	// 	if (err) {
	// 		console.log("Error while destroying session:", err);
	// 	} else {
	// 		req.logout(() => {
	// 			res.clearCookie("user_id");
	// 			console.log("You are logged out");
	// 			res.redirect("/");
	// 		});
	// 	}
	// });

	req.session = null;
	req.logout(() => {
		res.clearCookie("user_id");
		console.log("You are logged out");
		res.redirect("/");
	});

	// return handleOutput(res, { message: "User logged Out !!" }, StatusCodes.OK);
};

//~ GOOGLE AUTH

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "http://localhost:5000/auth/google/callback",
			passReqToCallback: true,
		},
		async function (request, accessToken, refreshToken, profile, done) {
			// const username, email, balance, createdAt, updatedAt, Password;
			const username = profile.displayName;
			const email = profile.email;
			await User.findOrCreate({
				where: { email: email },
				defaults: {
					username,
					email,
				},
			})
				.then((user) => {
					done(null, user);
				})
				.catch((err) => {
					console.log({ err });
				});
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

//TODO: Create a constraint for unique userName
//~ CREATE ACCOUNT
exports.createAccountFromCredentials = async (req, res) => {
	const { username, email, password, role } = req.body;
	const newPassword = await generateHashPassword(password);
	await User.create({
		username: username,
		email: email,
		password: newPassword,
		role: role,
	})
		.then((data) => {
			res.status(StatusCodes.CREATED).redirect("/");
			// return handleOutput(res, data, StatusCodes.CREATED);
		})
		.catch((error) => {
			return handleOutput(
				res,
				null,
				StatusCodes.EXPECTATION_FAILED,
				error.errors[0].message
			);
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

		console.log({ isValidPassword });
		if (isValidPassword) {
			const accessToken = generateAccessToken(foundUser.dataValues);

			const refreshToken = jwt.sign(
				foundUser.dataValues,
				process.env.REFRESH_TOKEN_SECRET
			);

			refreshTokens.push(refreshToken);

			// console.log({ accessToken, refreshToken });
			res.cookie("access-Token", accessToken, {
				expires: new Date(Date.now() + 120000),
				httpOnly: true,
			});
			res.cookie("refresh-token", refreshToken, {
				maxAge: 120000,
				httpOnly: true,
			});
			req.session.user = { id: foundUser.id, role: foundUser.role };
			res.redirect("/");
		} else {
			throw new Error("Wrong Password ");
		}
	} catch (error) {
		console.log({ error });
		res.redirect("auth/login");
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
