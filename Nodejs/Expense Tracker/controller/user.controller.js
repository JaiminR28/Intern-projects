const { StatusCodes } = require("http-status-codes");

const db = require("../models");
const { handleOutput } = require("../utils/outputhandler");

const User = db.User;

//~ GET ALL USERS
exports.getUser = async (req, res) => {
	const data = await User.findAll({});

	handleOutput(res, data, StatusCodes.OK);
};

//~ USER WITH ID
exports.getUserWithId = async (req, res) => {
	const id = req.params["id"];
	const data = await User.findByPk(id, {
		attributes: ["id", "username", "email", "balance"],
	});

	if (data) {
		return handleOutput(res, data, StatusCodes.OK);
	}
	handleOutput(res, null, StatusCodes.NOT_FOUND);
};
