const http = require("http");
const routes = require("./routes");
const express = require("express");

const app = express();

app.use((req, res, next) => {
	console.log("This is a middleware");
	next();
});

// console.log("Hello World");

const server = http.createServer(app);

server.listen(3000, () => {
	"server is listeining";
});
