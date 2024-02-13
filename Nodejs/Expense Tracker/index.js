const express = require("express");
const userRouter = require("./routes/user.routes");
const categoryRouter = require("./routes/categories.routes");
const expenseRouter = require("./routes/expense.routes");

const app = express();

app.use(express.json());

//~ ////////////////////////////////////////////////////
//~ ROUTES
//~ ////////////////////////////////////////////////////
app.use("/user", userRouter.router);
app.use("/categories", categoryRouter.router);
app.use("/expense", expenseRouter.router);

app.listen(5000, () => {
	console.log("App is running at port 5000");
});
