module.exports = (sequelize, DataTypes) => {
	const Player = sequelize.define("Player", { username: DataTypes.STRING });
	return Player;
};
