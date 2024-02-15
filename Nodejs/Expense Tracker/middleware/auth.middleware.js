const { StatusCodes } = require("http-status-codes");
const { handleOutput } = require("../utils/outputhandler");

exports.sessionChecker = (req, res, next) => {
	// console.log(req);
	console.log({ session: req.session.user, cookie: req.cookies });
	if (req.session.user && req.cookies.user_id) {
		req.user = req.session.user;
		next();
	} else {
		return handleOutput(
			res,
			null,
			StatusCodes.UNAUTHORIZED,
			"You are not logged In"
		);
	}
};
