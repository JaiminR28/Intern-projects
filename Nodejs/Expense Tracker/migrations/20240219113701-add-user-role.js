"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.sequelize.transaction((t) => {
			return Promise.all([
				queryInterface.addColumn(
					"users",
					"role",
					{
						type: Sequelize.DataTypes.STRING,
						validate: {
							isIn: [["user", "admin"]],
						},
						allowNull: false,
						defaultValue: "user",
					},
					{ transaction: t }
				),
			]);
		});
	},
};
