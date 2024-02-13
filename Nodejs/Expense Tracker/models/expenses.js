"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class expenses extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			expenses.belongsTo(models.User, { foreignKey: "userId" });
			expenses.belongsTo(models.categories, { foreignKey: "categoryId" });
		}
	}
	expenses.init(
		{
			amount: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			description: {
				type: DataTypes.STRING,
			},
		},
		{
			sequelize,
			modelName: "expenses",
		}
	);
	return expenses;
};
