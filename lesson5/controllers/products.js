var Product = require('../models/products');

exports.getProducts = function (req, res) {
	Product.find({}, function (err, products) {
		res.json(products);
	})
};

exports.getProduct = function (req, res) {
	Product.find({_id:req.params.productId}, function (err, product) {
		if (err) {
			res.send(err);
		};
		res.json(product);
	})
};

exports.addProduct = function (req, res) {
	var product = new Product();

	product.name = req.body.productName;
	product.description = req.body.productDescription;
	product.price = req.body.productPrice;
	product.photo = req.body.productPhotoUrl;

	product.save(function (err) {
		if (err) {
			res.send(err);
		};
		res.send({message: "Product saved successfully."});
	})
};

exports.updateProduct = function (req, res) {
	Product.update({_id:req.params.productId}, {
		name: req.body.productName,
		description: req.body.productDescription,
		price: req.body.productPrice,
		photo: req.body.productPhotoUrl
	}, function (err, num, raw) {
		if (err) {
			res.send(err);
		};
		res.json(num);
	})
};

exports.deleteProduct = function (req, res) {
	Product.remove({_id:req.params.productId}, function (err) {
		if (err) {
			res.send(err);
		};
		res.json({message: "Product deleted successfully"});
	})
};