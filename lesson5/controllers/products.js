var Product = require('../models/products');

exports.getProducts = function (req, res) {
	res.send("List of all products");
};

exports.getProduct = function (req, res) {
	res.send("A single product");
};

exports.addProduct = function (req, res) {
	res.send("product added");
};

exports.updateProduct = function (req, res) {
	res.send("product updated");
};

exports.deleteProduct = function (req, res) {
	res.send("product deleted");
};