const http = require("http");
const routes = require("./routes");
const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
	console.log("This is a middleware");
	next();
});

app.use("/add-product", (req, res, next) => {
	console.log("Into the another middleware");
	res.send(
		"<form> <input type='text' name='title' /> <button>Click here</button> </form>"
	);
});

app.use("/", (req, res, next) => {
	console.log("Into the last middleware");
	res.send("<h1>Hello from the Express !!</h1>");
});

// console.log("Hello World");

const server = http.createServer(app);

server.listen(3000, () => {
	"server is listeining";
});
