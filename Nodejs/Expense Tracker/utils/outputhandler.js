const { StatusCodes, getReasonPhrase } = require("http-status-codes");

exports.handleOutput = (res, data = null, status, errorMessage = "") => {
	if (data) {
		return res.status(status).json({ data });
	} else {
		const message = errorMessage ? errorMessage : getReasonPhrase(status);

		res.status(status).json({
			error: message,
		});
	}
};
