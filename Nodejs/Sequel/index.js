const express = require("express");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
dotenv.config({ path: ".env" });
const db = require("./util/database");
require("./models");

const userController = require("./controller/user.controller");

const app = express();

// MIDDLEWARES

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// CONFIGURING SERVER

app.post("/", userController.addUser);
app.get("/", userController.getUser);
app.post("/create-contact", userController.postContact);
app.get("/query", userController.queryUser);
app.get("/findAllUsers", userController.findAllUsers);
app.get("/get-set-virtual", userController.getSetVirtual);
app.get("/raw-query", userController.getRawQuery);

app.get("/eager-loading", userController.getEagerLoad);
app.post("/creator", userController.postCreatorUser);

app.get("/m-n-associations", userController.getMNAssociation);

app.get("/bulk-create", userController.bulCreate);

app.get("/get-transact", userController.getTransact);

app.get("/hooks", userController.getHooks);

app.get("/queryInterfaceUsers", userController.queryInterfaceUsers);

const PORT = process.env.PORT;

app.listen(PORT, () => {
	// console.log("The server is listening to Port : ", PORT);
});
