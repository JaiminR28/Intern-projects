const path = require("path");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" }); // 8626

const userRouter = require("./routes/user.routes");
const categoryRouter = require("./routes/categories.routes");
const expenseRouter = require("./routes/expense.routes");
const authRouter = require("./routes/auth.routes");

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
		cookie: { expires: 360000 },
	})
);

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

app.get("/", (req, res) => {
	res.render("dashboard", {
		pageTitle: "dashboard",
		path: "/dashboard",
	});
});

app.use("/user", userRouter.router);
app.use("/categories", categoryRouter.router);
app.use("/expense", expenseRouter.router);
app.use("/auth", authRouter.router);

app.listen(5000, () => {
	console.log("App is running at port 5000");
});
