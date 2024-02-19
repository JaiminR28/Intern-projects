const { StatusCodes } = require("http-status-codes");
const { handleOutput } = require("../utils/outputhandler");
const jwt = require("jsonwebtoken");

// exports.authenticateToken = (req, res, next) => {
// 	// console.log(req);
// 	console.log({ session: req.session.user, cookie: req.cookies });
// 	if (req.session.user && req.cookies.user_id) {
// 		req.user = req.session.user;
// 		next();
// 	} else {
// 		return handleOutput(
// 			res,
// 			null,
// 			StatusCodes.UNAUTHORIZED,
// 			"You are not logged In"
// 		);
// 	}
// };

exports.isLoggedIn = (req, res, next) => {
	if (req.user || req.session.user) {
		req.user = req.user ? req.user[0] : req.session.user;
		next();
	} else {
		res.redirect("/auth/login");
	}
};

exports.authenticateToken = (req, res, next) => {
	// console.log({ req: req.cookies.user_id });
	console.log({ reqToken: req });
	if (req.cookies.user_id) return next();
	const authHeader = req.headers["authorization"];
	const token = authHeader?.split(" ")[1];
	if (token == null)
		return handleOutput(
			res,
			null,
			StatusCodes.NOT_ACCEPTABLE,
			"Could not find the Token"
		);

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return handleOutput(res, null, StatusCodes.UNAUTHORIZED);
		req.user = user;
		next();
	});
};
