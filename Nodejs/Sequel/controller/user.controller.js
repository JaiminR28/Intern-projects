const { QueryTypes } = require("sequelize");
const db = require("../models");

const User = db.user;
const Contact = db.contact;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

exports.getUser = (req, res) => {
	User.findAll()
		.then((user) => {
			res.status(200).json({ data: user });
		})
		.catch((err) => console.log(err));
};

exports.queryUser = async (req, res) => {
	try {
		const data = await User.findAll({
			attributes: [
				"firstName",
				[db.Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
			],
			group: ["firstName"],
		});

		res.status(200).json({ data });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

exports.addUser = async (req, res) => {
	const recFirstName = req.body.firstName;
	const recLastName = req.body.lastName;

	// If we wish to only send data of some particular fields then we can pass it under the fields array
	const data = await User.create({
		firstName: recFirstName,
		lastName: recLastName,
	});

	// // console.log(steve); // Don't do this
	// console.log(steve.toJSON()); // This is good!
	// console.log(JSON.stringify(steve, null, 4)); // This is also good!
	res.status(200).json({ data });
};
exports.postContact = async (req, res) => {
	const recFirstName = req.body.mobile;
	const recAddress = req.body.address;
	const recUserId = req.body.UserId;

	// If we wish to only send data of some particular fields then we can pass it under the fields array
	const data = await Contact.create({
		mobile: recFirstName,
		address: recAddress,
		UserId: recUserId,
	});

	if (data) {
		return res.status(200).json({ data });
	}
	return res.status(404).json({
		message: "Could  not create Contact",
	});
};

exports.findAllUsers = async (req, res) => {
	const { count, rows } = await User.findAndCountAll({
		where: {
			lastName: "Musk",
		},
	});

	if (count) {
		return res.status(200).json({ rows, count });
	}
	return res.status(404).json({ error: "Internal Server Error" });
};

exports.getSetVirtual = async (req, res) => {
	const data = await User.findAll({
		where: {
			lastName: "Musk",
		},
	});

	if (data) {
		return res.status(200).json({ data });
	}
	return res.status(404).json({ error: "Internal Server Error" });
};

exports.getRawQuery = async (req, res) => {
	const data = await sequelize.query(
		"SELECT * FROM `users` WHERE lastName IN(:last)",
		{
			replacements: { last: ["Musk", "Nohara"] },
			type: QueryTypes.SELECT,
		}
	);
	if (data) {
		return res.status(200).json({ data });
	}
	res.status(404).json({ error: "Internal Server Error" });
};

exports.getEagerLoad = async (req, res) => {
	const data = await User.findAll({
		include: {
			model: Contact,
			required: true,
		},
	});

	if (data) {
		return res.status(200).json({ data });
	}
	res.status(404).json({ error: "Internal Server Error" });
};
