const Cart = require("./cart");
const db = require("../util/database");

module.exports = class Product {
	constructor(id, title, imageUrl, description, price) {
		this.id = id;
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}

	save() {
		//~ We will get the product from the getProductsFromFile which we will use in the the function onWards
		return db.execute(
			"INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)",
			[this.title, this.price, this.description, this.imageUrl]
		);
	}

	static deleteById(id) {}
	static fetchAll() {
		return db.execute("SELECT * FROM products");
	}
	static findById(id) {
		return db.execute(`SELECT * FROM products WHERE id = ${id}`);
	}
};
