const fs = require("fs");
const path = require("path");
const Product = require("../models/product");

const p = path.join(
	path.dirname(process.mainModule.filename),
	"data",
	"cart.json"
);

const getProductsFromFile = (cb) => {
	fs.readFile(p, (err, fileContent) => {
		if (err) {
			cb([]);
		} else {
			cb(JSON.parse(fileContent));
		}
	});
};

const writeIntoTheFile = (response) => {
	fs.writeFile(p, JSON.stringify(response), (err) => {
		console.log(err);
	});
};

module.exports = class Cart {
	static addProduct(id) {
		getProductsFromFile((response) => {
			let { products, totalItems, totalCost } = response;
			// const foundItem = products.find((product) => product.id === id);
			// Analyze the cart => Find existing product
			const existingProductIndex = products.findIndex(
				(prod) => prod.id === id
			);
			const existingProduct = products[existingProductIndex];
			let updatedProduct;
			// Add new product/ increase quantity
			if (existingProduct) {
				updatedProduct = { ...existingProduct };
				updatedProduct.qty = updatedProduct.qty + 1;
				products = [...products];
				products[existingProductIndex] = updatedProduct;
			} else {
				updatedProduct = { id: id, qty: 1 };
				products = [...products, updatedProduct];
			}
			cart.totalPrice = cart.totalPrice + +productPrice;
			fs.writeFile(p, JSON.stringify(cart), (err) => {
				console.log(err);
			});
		});

		// Find the Product present at that ID
		// Increment the count of the product.
	}
};
