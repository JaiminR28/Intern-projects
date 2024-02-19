"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const t = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.changeColumn(
				"users",
				"Password",
				{
					type: Sequelize.DataTypes.STRING,
				},
				{ transaction: t }
			);

			await queryInterface.changeColumn("users", "email", {
				type: Sequelize.DataTypes.STRING,
				unique: true,
				allowNull: false,
			});
		} catch (error) {
			console.log(error);
		}
	},
};
