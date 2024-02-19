"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	// TODO: change the email to be unique
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of DataTypes lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			User.hasMany(models.expenses, {
				foreignKey: "userId",
			});
		}
	}
	User.init(
		{
			username: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
			},
			balance: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
			},
			role: {
				type: DataTypes.STRING,
				validate: {
					isIn: [["user", "admin"]],
				},
				allowNull: false,
				defaultValue: "user",
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
