const http = require("http");
const fs = require("fs");

// console.log("Hello World");

const server = http.createServer((req, res) => {
	// console.log(req);
	const url = req.url;
	const method = req.method;

	if (url == "/") {
		res.setHeader("Content-Type", "text/html");
		res.write("<html>");
		res.write("<head><title>Enter Message</title></head>");
		res.write(
			"<body><form action='/message' method='POST'><input type='text'name='message'> <button >Click here !!</button> </form></body>"
		);
		res.write("</html>");
		return res.end();
	}
	if (url === "/message" && method === "POST") {
		const body = [];
		req.on("data", (chunk) => {
			body.push(chunk);
		});
		req.on("end", () => {
			const parsedBody = Buffer.concat(body).toString();
			const message = parsedBody.split("=")[1];
			fs.writeFileSync("message.txt", message);
			//! This is an async task
			res.statusCode = 302;
			res.setHeader("Location", "/");
			return res.end();
		});
	}

	res.setHeader("Content-Type", "text/html");
	res.write("<html>");
	res.write("<head><title>This is the title</title></head>");
	res.write("<body>You have been redirected</body>");
	res.write("</html>");
	res.end();
});

server.listen(8000, () => {
	"server is listeining";
});
