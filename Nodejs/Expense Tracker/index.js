const express = require("express");
const userRouter = require("./routes/user.routes");

const app = express();

app.use(express.json());

//~ ////////////////////////////////////////////////////
//~ ROUTES
//~ ////////////////////////////////////////////////////
app.use("/user", userRouter.router);

app.listen(5000, () => {
	console.log("App is running at port 5000");
});
