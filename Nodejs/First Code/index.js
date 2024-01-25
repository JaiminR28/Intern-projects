const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

//~ /////////////////////////////
//~ MIDDLEWARES
//~ /////////////////////////////
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);
app.use((req, res, next) => {
	res.status(404).sendFile(path.join(__dirname, "views", "404.ejs"));
});

// console.log("Hello World");

//~ /////////////////////////////
//~ CREATING SERVER
//~ /////////////////////////////
const server = http.createServer(app);

server.listen(3000, () => {
	"server is listeining";
});
