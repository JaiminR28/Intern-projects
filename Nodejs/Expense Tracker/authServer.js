// const path = require("path");
// const express = require("express");
// const cookieParser = require("cookie-parser");
// const dotenv = require("dotenv");
// const jwt = require("jsonwebtoken");

// if (process.env.NODE_ENV !== "development") {
// 	dotenv.config({ path: "./config.env" });
// }

// const authRouter = require("./routes/auth.routes");

// const app = express();

// app.set("view engine", "ejs");
// app.set("views", "views");

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

// app.use(express.static(path.join(__dirname, "public")));

// // app.use(
// // 	session({
// // 		key: "user_id",
// // 		secret: "keyboard cat",
// // 		resave: false,
// // 		saveUninitialized: true,
// // 		cookie: { expires: 360000 },
// // 	})
// // );

// //~ ////////////////////////////////////////////////////
// //~ ROUTES
// //~ ////////////////////////////////////////////////////

// // app.use((req, res, next) => {
// // 	console.log({ session: req.session, cookie: req.cookies });
// // 	if (req.session && req.session.user && req.cookies.user_id) {
// // 		res.render("dashboard", { name: req.session.user.username });
// // 		return next();
// // 	}
// // 	else {

// // 	}
// // });

// app.listen(4000, () => {
// 	console.log("App is running at port 4000");
// });
