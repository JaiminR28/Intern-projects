const { QueryTypes } = require("sequelize");
const db = require("../models");

const User = db.user;
const Contact = db.contact;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Teams = db.team;
const Player = db.player;
const Game = db.game;
const GameTeam = db.GameTeam;
const PlayerGameTeam = db.PlayerGameTeam;

const handleOutput = (res, data = null) => {
	if (data) {
		return res.status(200).json({ data });
	}
	return res.status(404).json({ error: "Internal Server Error" });
};

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
	return handleOutput(res, data);
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

	handleOutput(res, data);
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

	handleOutput(res, data);
};

exports.getRawQuery = async (req, res) => {
	const data = await sequelize.query(
		"SELECT * FROM `users` WHERE lastName IN(:last)",
		{
			replacements: { last: ["Musk", "Nohara"] },
			type: QueryTypes.SELECT,
		}
	);

	handleOutput(res, data);
};

exports.getEagerLoad = async (req, res) => {
	const data = await User.findAll({
		include: {
			model: Contact,
			required: true,
		},
	});

	handleOutput(res, data);
};

exports.postCreatorUser = async (req, res) => {
	const recFirstName = req.body.mobile;
	const recAddress = req.body.address;

	// If we wish to only send data of some particular fields then we can pass it under the fields array
	await Contact.create(
		{
			mobile: recFirstName,
			address: recAddress,
			users: {
				firstName: req.body.firstName,
				lastName: req.res.lastName,
			},
		},
		{
			include: [db.ContactUser],
		}
	);

	const data = await User.findAll({
		include: {
			model: Contact,
			required: true,
		},
	});

	return handleOutput(data);
};

exports.getMNAssociation = async (req, res) => {
	// const amidala = await db.customer.create({
	// 	username: "p4dm3",
	// 	points: 1000,
	// });
	// const queen = await db.profile.create({ name: "Queen" });
	// await amidala.addProfile(queen, { through: { selfGranted: false } });
	// const result = await db.customer.findOne({
	// 	where: { username: "p4dm3" },
	// 	include: db.profile,
	// });
	// console.log(result);

	const amidala = await db.customer.create(
		{
			username: "Jaimin",
			points: 1000,
			profiles: [
				{
					name: "Rathwa",
					Grant: {
						selfGranted: true,
					},
				},
			],
		},
		{
			include: db.profile,
		}
	);

	const result = await db.customer.findOne({
		where: { username: "Jaimin" },
		include: db.profile,
	});

	return handleOutput(res, result);
};

exports.bulCreate = async (req, res) => {
	// const data = await Game.bulkCreate(
	// 	[
	// 		{
	// 			name: "Cricket",
	// 			Teams: [
	// 				{
	// 					name: "India",
	// 				},
	// 				{
	// 					name: "Australia",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			name: "Football",
	// 			Teams: [
	// 				{
	// 					name: "Spain",
	// 				},
	// 			],
	// 		},
	// 	],
	// 	{
	// 		include: Teams,
	// 	}
	// );

	// await Player.bulkCreate([
	// 	{ username: "s0me0ne" },
	// 	{ username: "empty" },
	// 	{ username: "greenhead" },
	// 	{ username: "not_spock" },
	// 	{ username: "bowl_of_petunias" },
	// ]);
	// await Game.bulkCreate([
	// 	{ name: "The Big Clash" },
	// 	{ name: "Winter Showdown" },
	// 	{ name: "Summer Beatdown" },
	// ]);
	// await Teams.bulkCreate([
	// 	{ name: "The Martians" },
	// 	{ name: "The Earthlings" },
	// 	{ name: "The Plutonians" },
	// ]);

	// await GameTeam.bulkCreate([
	// 	{ GameId: 1, TeamId: 1 }, // this GameTeam will get id 1
	// 	{ GameId: 1, TeamId: 2 }, // this GameTeam will get id 2
	// 	{ GameId: 2, TeamId: 1 }, // this GameTeam will get id 3
	// 	{ GameId: 2, TeamId: 3 }, // this GameTeam will get id 4
	// 	{ GameId: 3, TeamId: 2 }, // this GameTeam will get id 5
	// 	{ GameId: 3, TeamId: 3 }, // this GameTeam will get id 6
	// ]);

	// await PlayerGameTeam.bulkCreate([
	// 	// In 'Winter Showdown' (i.e. GameTeamIds 3 and 4):
	// 	{ PlayerId: 1, GameTeamId: 3 }, // s0me0ne played for The Martians
	// 	{ PlayerId: 3, GameTeamId: 3 }, // greenhead played for The Martians
	// 	{ PlayerId: 4, GameTeamId: 4 }, // not_spock played for The Plutonians
	// 	{ PlayerId: 5, GameTeamId: 4 }, // bowl_of_petunias played for The Plutonians
	// ]);

	const data = await Game.findOne({
		where: {
			name: "Winter Showdown",
		},
		include: {
			model: GameTeam,
			include: [
				{
					model: Player,
					through: { attributes: [] }, // Hide unwanted `PlayerGameTeam` nested object from results
				},
				Teams,
			],
		},
	});

	return handleOutput(res, data);
};

exports.getTransact = async (req, res) => {
	const t = await sequelize.transaction();

	try {
		// If we wish to only send data of some particular fields then we can pass it under the fields array
		const data = await User.create(
			{
				firstName: "Jethalal",
				lastName: "Gada",
			},
			{ transaction: t }
		);

		await data.addSibling(
			{
				firstName: "Atmaram",
				lastName: "Bhide",
			},
			{ transaction: t }
		);

		// // console.log(steve); // Don't do this
		// console.log(steve.toJSON()); // This is good!
		// console.log(JSON.stringify(steve, null, 4)); // This is also good!
		await t.commit();
		return handleOutput(res, data);
	} catch (error) {
		await t.rollback();
	}
};

exports.getHooks = async (req, res) => {
	const data = await User.create({
		firstName: "navneet",
		lastName: "Singh",
	});

	// await User.destroy({
	// 	where: {
	// 		id: 1,
	// 	},
	// });

	return handleOutput(res, data);
};
