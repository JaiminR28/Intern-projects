module.exports = (sequelize, DataTypes) => {
	const Game = sequelize.define("Game", { name: DataTypes.STRING });
	return Game;
};
