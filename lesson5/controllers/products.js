var Product = require('../models/products');

function _getProducts(next, res) {
	Product.find({}, function (err, products) {
		next(err, res, products);
	});
}

function _sendJSON (err, res, val) {
	if (err) {
		res.send(err);
	} else {
		res.json(val);
	}
}

exports.getProducts = function (req, res) {
	_getProducts(_sendJSON, res);
};

function _renderProducts(err, res, products) {
	if (err) {
		res.send(err);
	} else {
		res.render('products/index', {products: products});
	}
}

exports.renderProducts = function (req, res) {
	_getProducts(_renderProducts, res);
}

function _getProduct(next, id, res) {
	Product.find({_id: id}, function (err, products) {
		next(err, res, products);
	})
}

exports.getProduct = function (req, res) {
	_getProduct(_sendJSON, req.params.productId, res);
};


function _renderProduct(err, res, products) {
	if (err) {
		res.send(err);
	} else {
		res.render('products/show', {product: products[0]});
	}
}

exports.renderProduct = function (req, res) {
	_getProduct(_renderProduct, req.params.productId, res);
}

exports.renderNewProduct = function (req, res) {
	res.render("products/new", {product: new Product()});
}

exports.saveAndRenderProduct = function (req, res) {
	var product = new Product(req.body.product);
	product.save(function (err) {
		if (err) {
			res.send(err);
		} else {
			res.redirect("/product/" + product._id.toHexString());
		};
	})
}

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