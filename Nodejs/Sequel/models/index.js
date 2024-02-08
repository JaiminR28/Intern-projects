const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
	"employeedb",
	"root",
	process.env.DATABASE_PASS,
	{
		host: "localhost",
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

db.user = require("./user")(sequelize, DataTypes);
db.contact = require("./contact")(sequelize, DataTypes);

const User = db.user;
const Contacts = db.contact;

User.hasMany(Contacts, { foreignKey: "UserId" });
Contacts.belongsTo(User, { foreignKey: "UserId" });

// User.belongsToMany(Contacts, { through: "contact_user" });
// Contacts.belongsToMany(User, { through: "contact_user" });

// db.sequelize.sync({ force: true });
db.sequelize.sync();
module.exports = db;
