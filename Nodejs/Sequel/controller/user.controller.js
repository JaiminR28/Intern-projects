const db = require("../util/database");

const User = db.user;

exports.getUser = (req, res) => {
	User.findAll()
		.then((user) => {
			res.status(200).json({ data: user });
		})
		.catch((err) => console.log(err));
};

exports.queryUser = async (req, res) => {
	const recFirstName = req.body.firstName;
	const recLastName = req.body.lastName;

	const data = await User.create(
		{
			firstName: recFirstName,
			lastName: recLastName,
		},
		{ fields: ["firstName"] }
	);
	res.status(200).json({ data: data });
};

exports.addUser = async (req, res) => {
	const recFirstName = req.body.firstName;
	const recLastName = req.body.lastName;

	// If we wish to only send data of some particular fields then we can pass it under the fields array
	const steve = await User.create({
		firstName: recFirstName,
		lastName: recLastName,
	});
	// console.log(steve); // Don't do this
	console.log(steve.toJSON()); // This is good!
	console.log(JSON.stringify(steve, null, 4)); // This is also good!
	res.status(200).json(steve.toJSON());
};
