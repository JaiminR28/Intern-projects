const path = require("path");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const passport = require("passport");

if (process.env.NODE_ENV !== "development") {
	dotenv.config({ path: "./config.env" });
}

const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const categoryRouter = require("./routes/categories.routes");
const expenseRouter = require("./routes/expense.routes");
const authMiddleware = require("./middleware/auth.middleware");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use(
	session({
		key: "user_id",
		secret: "keyboard cat",
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false },
	})
);

app.use(passport.initialize());
app.use(passport.session());

//~ ////////////////////////////////////////////////////
//~ ROUTES
//~ ////////////////////////////////////////////////////

// app.use((req, res, next) => {
// 	console.log({ sesssion: req.session, cookie: req.cookies });
// 	if (req.session && req.session.user && req.cookies.user_id) {
// 		res.render("dashboard", { name: req.session.user.username });
// 		return next();
// 	}
// 	else {

// 	}
// });

app.get("/dashboard", authMiddleware.isLoggedIn, (req, res) => {
	res.render("dashboard", {
		pageTitle: "dashboard",
		path: "/dashboard",
		user: null,
	});
}).get("/", authMiddleware.isLoggedIn, (req, res) => {
	res.render("dashboard", {
		pageTitle: "dashboard",
		path: "/dashboard",
		user: null,
	});
});

app.use("/auth", authRouter.router);
app.use("/user", userRouter.router);
app.use("/categories", categoryRouter.router);
app.use("/expense", expenseRouter.router);

app.get("/failed", (req, res) => {
	console.log("User is not authenticated");
	res.send("Failed");
});

// Success route if the authentication is successful
app.get("/success", authMiddleware.isLoggedIn, (req, res) => {
	// console.log("You are logged in");
	res.render("dashboard", {
		pageTitle: "dashboard",
		path: "/dashboard",
		user: req.user.displayName,
	});
});

app.listen(5000, () => {
	console.log("App is running at port 5000");
});
