const mysql = require("mysql2");

const pool = mysql.createPool({
	host: "localhost",
	user: "root",
	database: "new_schema",
	password: process.env.DATABASE,
});

module.exports = pool.promise();
