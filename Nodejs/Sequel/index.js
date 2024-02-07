const express = require("express");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
dotenv.config({ path: ".env" });
const db = require("./util/database");
require("./util/database");

const userController = require("./controller/user.controller");

const app = express();

// MIDDLEWARES

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// CONFIGURING SERVER

app.post("/", userController.addUser);
app.get("/", userController.getUser);
app.post("/query", userController.queryUser);

const PORT = process.env.PORT;

db.sequelize
	.sync()
	// .sync({ force: true })
	.then(() => {
		app.listen(PORT, () => {
			// console.log("The server is listening to Port : ", PORT);
		});
	})
	.catch((err) => console.log(err));
