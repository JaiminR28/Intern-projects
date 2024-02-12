const { StatusCodes, getReasonPhrase } = require("http-status-codes");

const db = require("../models");

const User = db.user;

const handleOutput = (res, data = null, status) => {
	if (data) {
		return res.status(status).json({ data });
	} else {
		res.status(StatusCodes.NOT_FOUND).json({
			error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
		});
	}
};

exports.getUser = async (req, res) => {
	const data = await User.findAll({});

	handleOutput(res, data, StatusCodes.OK);
};

exports.createUser = async (req, res) => {
	console.log(req.body);
	const { username, email } = req.body;
	await User.create({
		username: username,
		email: email,
	})
		.then((data) => {
			return handleOutput(res, data, StatusCodes.CREATED);
		})
		.catch((err) => {
			console.log(err);
		});
};
