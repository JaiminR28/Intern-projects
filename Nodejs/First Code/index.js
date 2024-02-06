const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" }); // 8626

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const app = express();

//~ /////////////////////////////
//~ MIDDLEWARES
//~ /////////////////////////////

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
// app.use(shopRoutes);
// app.use(errorController.get404);

// console.log("Hello World");

sequelize
	.sync()
	.then((result) => {
		// console.log(result);
		app.listen(5000, () => {
			"server is listeining";
		});
	})
	.catch((err) => console.error(err));

//~ /////////////////////////////
//~ CREATING SERVER
//~ /////////////////////////////
