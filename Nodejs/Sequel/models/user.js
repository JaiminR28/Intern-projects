module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"user",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
				get() {
					const rawValue = this.getDataValue("firstName");
					return rawValue ? rawValue.toUpperCase() : null;
				},
			},
			lastName: {
				type: DataTypes.STRING,
				defaultValue: "Jobs",
			},
		},
		{
			tableName: "users",
		}
	);

	return User;
};

// console.log(User === sequelize.models.user); // true
