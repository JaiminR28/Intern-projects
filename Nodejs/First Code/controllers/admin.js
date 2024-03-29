const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
	res.render("admin/edit-product", {
		pageTitle: "Add Product",
		path: "/admin/add-product",
		editing: false,
	});
};

exports.postAddProduct = (req, res, next) => {
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;
	// console.log({ id: req.user.id });
	req.user
		.createProduct({
			title: title,
			price: price,
			imageUrl,
			description: description,
			userId: req.user.id,
		})
		.then((result) => {
			// console.log(result);
			console.log("Created product");
			res.redirect("/");
		})
		.catch((err) => console.error(err));
};

exports.getProducts = (req, res, next) => {
	req.user
		.getProducts()
		.then((products) => {
			res.render("admin/products", {
				prods: products,
				pageTitle: "Admin Products",
				path: "/admin/products",
			});
		})
		.catch((err) => console.error(err));
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		return res.redirect("/");
	}
	const prodId = req.params.productId;
	req.user
		.getProducts({ where: { id: prodId } })
		.then((product) => {
			if (!product) {
				return res.redirect("/");
			}

			const data = product[0];

			res.render("admin/edit-product", {
				pageTitle: "Edit Product",
				path: "/admin/edit-product",
				editing: editMode,
				product: data,
			});
		})
		.catch((err) => console.error(err));
};

exports.postEditProduct = (req, res, next) => {
	const prodId = req.body.productId;
	const updatedTitle = req.body.title;
	const updatedPrice = req.body.price;
	const updatedImageUrl = req.body.imageUrl;
	const updatedDesc = req.body.description;

	Product.findByPk(prodId)
		.then((product) => {
			product.title = updatedTitle;
			product.price = updatedPrice;
			product.imageUrl = updatedImageUrl;
			product.description = updatedDesc;
			return product.save();
		})
		.then((result) => {
			console.log("UPDATED PRODUCT !");
			res.redirect(`/admin/products`);
		})
		.catch((err) => console.log(err));

	// Product.update(
	// 	{
	// 		title: updatedTitle,
	// 		price: updatedPrice,
	// 		updatedImageUrl: updatedImageUrl,
	// 		description: updatedDesc,
	// 	},
	// 	{
	// 		where: {
	// 			id: prodId,
	// 		},
	// 	}
	// );
};

exports.postDeleteProduct = (req, res, next) => {
	const prodId = req.body.productId;
	Product.findByPk(prodId)
		.then((product) => {
			return product.destroy();
		})
		.then((result) => {
			console.log("DESTROYED PRODUCT");
			res.redirect("/admin/products");
		})
		.catch((err) =>
			console.log("Product You are trying to deleted does not exisit")
		);
};
