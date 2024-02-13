const { StatusCodes, getReasonPhrase } = require("http-status-codes");

const db = require("../models");

const Category = db.category;

const handleOutput = (res, data = null, status) => {
	if (data) {
		return res.status(status).json({ data });
	} else {
		res.status(StatusCodes.NOT_FOUND).json({
			error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
		});
	}
};

exports.getCategory = async (req, res) => {
	console.log("called");
	const data = await Category.findAll({});

	handleOutput(res, data, StatusCodes.OK);
};

exports.createCategory = async (req, res) => {
	const { name } = req.body;
	await Category.create({
		name: name,
	})
		.then((data) => {
			return handleOutput(res, data, StatusCodes.CREATED);
		})
		.catch((err) => {
			console.log(err);
		});
};
