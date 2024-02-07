const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" }); // 8626

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-items");

const app = express();

//~ /////////////////////////////
//~ MIDDLEWARES
//~ /////////////////////////////

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.use((req, res, next) => {
	User.findByPk(1)
		.then((user) => {
			// console.log({ user: user.id });
			req.user = user;
			next();
		})
		.catch((err) => console.log(err));
});

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
// app.use(shopRoutes);
// app.use(errorController.get404);

// console.log("Hello World");

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(Product);
Cart.belongsToMany(Product, { through: CartItem });

Product.belongsToMany(Cart, { through: CartItem });

//~ /////////////////////////////
//~ CALLING SEQUELIZE FOR SYNC
//~ /////////////////////////////

sequelize
	// .sync({ force: true })
	.sync()
	.then((result) => {
		// console.log(result);
		return User.findByPk(1)
			.then((user) => {
				if (!user) {
					return User.create({
						name: "Max",
						email: "Dummy@gmai.com",
					});
				}
				return user;
			})
			.then((user) => {
				//~ /////////////////////////////
				//~ CREATING SERVER
				//~ /////////////////////////////

				app.listen(5000, () => {
					"server is listeining";
				});
			})
			.catch((err) => console.log(err));
	})
	.catch((err) => console.error(err));
