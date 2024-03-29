"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.changeColumn("users", "Password", {
			type: Sequelize.DataTypes.STRING,
			allowNull: false,
		});
	},
};
