const express = require("express");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");

dotenv.config({ path: ".env" });

const app = express();

// MIDDLEWARES

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// CONFIGURING SERVER
const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log("The server is listening to Port : ", PORT);
});
