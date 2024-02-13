const { StatusCodes, getReasonPhrase } = require("http-status-codes");

exports.handleOutput = (res, data = null, status) => {
	if (data) {
		return res.status(status).json({ data });
	} else {
		res.status(status).json({
			error: getReasonPhrase(status),
		});
	}
};
