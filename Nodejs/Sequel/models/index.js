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
db.customer = require("./customer")(sequelize, DataTypes);
db.profile = require("./profile")(sequelize, DataTypes);
db.player = require("./player")(sequelize, DataTypes);
db.team = require("./team")(sequelize, DataTypes);
db.game = require("./game")(sequelize, DataTypes);

const User = db.user;
const Contacts = db.contact;

// User.hasMany(Contacts, { foreignKey: "UserId" });
// db.ContactUser = Contacts.belongsTo(User, {
// 	foreignKey: "UserId",
// 	as: "users",
// });

// User.belongsToMany(Contacts, { through: "contact_user" });
// Contacts.belongsToMany(User, { through: "contact_user" });

// const Grant = sequelize.define(
// 	"grant",
// 	{
// 		id: {
// 			type: DataTypes.INTEGER,
// 			primaryKey: true,
// 			autoIncrement: true,
// 			allowNull: false,
// 		},
// 		selfGranted: DataTypes.BOOLEAN,
// 	},
// 	{ timestamps: false }
// );
// db.customer.belongsToMany(db.profile, {
// 	through: Grant,
// 	uniqueKey: "my_custom_unique",
// });
// db.profile.belongsToMany(db.customer, {
// 	through: Grant,
// 	uniqueKey: "my_custom_unique",
// });

// // Setup a One-to-Many relationship between User and Grant
// db.customer.hasMany(Grant);
// Grant.belongsTo(db.customer);

// // Also setup a One-to-Many relationship between Profile and Grant
// db.profile.hasMany(Grant);
// Grant.belongsTo(db.profile);

const Team = db.team;
const Player = db.player;
const Game = db.game;

db.GameTeam = sequelize.define(
	"GameTeam",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
	},
	{
		timestamps: false,
	}
);

Game.belongsToMany(Team, { through: db.GameTeam });
Team.belongsToMany(Game, { through: db.GameTeam });
db.GameTeam.belongsTo(Team);
db.GameTeam.belongsTo(Game);
Game.hasMany(db.GameTeam);
Team.hasMany(db.GameTeam);

db.PlayerGameTeam = sequelize.define(
	"PlayerGameTeam",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
	},
	{
		timestamps: false,
	}
);
Player.belongsToMany(db.GameTeam, { through: db.PlayerGameTeam });
db.GameTeam.belongsToMany(Player, { through: db.PlayerGameTeam });
db.PlayerGameTeam.belongsTo(Player);
db.PlayerGameTeam.belongsTo(db.GameTeam);
Player.hasMany(db.PlayerGameTeam);
db.GameTeam.hasMany(db.PlayerGameTeam);

// db.sequelize.sync({ force: true });
db.sequelize.sync();
module.exports = db;
