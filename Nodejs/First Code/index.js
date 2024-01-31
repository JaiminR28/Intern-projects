const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const errorController = require("./controllers/error");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

//~ /////////////////////////////
//~ MIDDLEWARES
//~ /////////////////////////////
const app = express();

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

//~ /////////////////////////////
//~ CREATING SERVER
//~ /////////////////////////////
const server = http.createServer(app);

server.listen(5000, () => {
	"server is listeining";
});
