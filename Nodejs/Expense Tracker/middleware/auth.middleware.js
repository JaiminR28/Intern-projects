const { StatusCodes } = require("http-status-codes");
const { handleOutput } = require("../utils/outputhandler");

exports.sessionChecker = (req, res, next) => {
	console.log({ session: req.session });
	if (req.session.user && req.cookies.user_id) {
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
