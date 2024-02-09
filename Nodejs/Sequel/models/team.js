module.exports = (sequelize, DataTypes) => {
	const Teams = sequelize.define(
		"Teams",
		{ name: DataTypes.STRING },
		{
			tableName: "teams",
		}
	);
	return Teams;
};
