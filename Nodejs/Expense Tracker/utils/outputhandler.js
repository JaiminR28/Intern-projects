const { StatusCodes, getReasonPhrase } = require("http-status-codes");

exports.handleOutput = (res, data = null, status) => {
	if (data) {
		return res.status(status).json({ data });
	} else {
		res.status(StatusCodes.NOT_FOUND).json({
			error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
		});
	}
};
