const fs = require("fs");

const requestHandler = (req, res) => {
	const url = req.url;
	const method = req.method;
	if (url == "/") {
		res.setHeader("Content-Type", "text/html");
		res.write("<html>");
		res.write("<head><title>Enter Message</title></head>");
		res.write(
			"<body><form action='/message' method='POST'><input type='text'name='message'> <button >Click here !!</button> </form> </body>"
		);
		res.write("</html>");
		return res.end();
	}
	if (url === "/message" && method === "POST") {
		const body = [];
		req.on("data", (chunk) => {
			body.push(chunk);
		});
		return req.on("end", () => {
			const parsedBody = Buffer.concat(body).toString();
			const message = parsedBody.split("=")[1];

			//~ WriteFileSync blocks the code while WriteFile is an asyncronouse task
			fs.writeFile("message.txt", message, (err) => {
				console.log("to be second exec.");

				//! This is an async task and setting the header after it is set by the next code will give us error
				res.statusCode = 302;
				res.setHeader("Location", "/");
				return res.end();
			});
		});
	}

	res.setHeader("Content-Type", "text/html");
	res.write("<html>");
	res.write("<head><title>This is the title</title></head>");
	res.write("<body>You have been redirected</body>");
	res.write("</html>");
	res.end();
};

module.exports = requestHandler;
