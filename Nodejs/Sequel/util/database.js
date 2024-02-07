const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
	"employeedb",
	"root",
	process.env.DATABASE_PASS,
	{
		host: "localhost",
		logging: false,
		dialect: "mysql",
	}
);

try {
	sequelize.authenticate();
	console.log(
		"Connection with the database has been established successfully."
	);
} catch (err) {
	console.log("Could not connect to the database");
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user")(sequelize, DataTypes);
db.contact = require("../models/contact")(sequelize, DataTypes);

module.exports = db;
