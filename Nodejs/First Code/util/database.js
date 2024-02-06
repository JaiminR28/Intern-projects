// const mysql = require("mysql2");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("new_schema", "root", process.env.DATABASE, {
	dialect: "mysql",
	host: "localhost",
});

module.exports = sequelize;

// const pool = mysql.createPool({
// 	host: "localhost",
// 	user: "root",
// 	database: "new_schema",
// 	password: process.env.DATABASE,
// });

// module.exports = pool.promise();
