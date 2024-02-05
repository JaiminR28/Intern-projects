const mysql = require("mysql2");
console.log(process.env.DATABASE_PASS);
const pool = mysql.createPool({
	host: "localhost",
	user: "root",
	database: "new_schema",
	password: "admin@123",
});

module.exports = pool.promise();
