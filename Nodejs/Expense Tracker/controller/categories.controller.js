const { StatusCodes } = require("http-status-codes");

const db = require("../models");
const { handleOutput } = require("../utils/outputhandler");

// console.log(handleOutput);
const Category = db.categories;

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
