module.exports = (sequelize, DataTypes) => {
	const Contacts = sequelize.define("contacts", {
		mobile: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		address: {
			type: DataTypes.STRING,
		},
		UserId: DataTypes.INTEGER,
	});

	return Contacts;
};
