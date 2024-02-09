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
				validate: {
					isAlpha: {
						msg: "Only alphabets are allowed",
					},
					isLowercase: true,
					len: [2, 10],
				},
			},
			lastName: {
				type: DataTypes.STRING,
				defaultValue: "Jobs",
			},
			fullName: {
				type: DataTypes.VIRTUAL,
				get() {
					return `${this.firstName} ${this.lastName}`;
				},
				set() {
					throw new Error(`Do Not try to set the 'fullName' value !`);
				},
			},
			status: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
		},
		{
			tableName: "users",
			hooks: {
				beforeValidate: (user, options) => {
					user.firstName = "happy";
				},
				afterValidate: (user, options) => {
					user.status = 1;
				},
			},
		}
	);

	return User;
};

// console.log(User === sequelize.models.user); // true
