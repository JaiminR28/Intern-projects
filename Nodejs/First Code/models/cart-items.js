const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const CartItem = sequelize.define("cartItem", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
		primaryKey: true,
	},
	quantity: DataTypes.INTEGER,
});

module.exports = CartItem;
