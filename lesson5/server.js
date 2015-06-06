var express = require('express');
var app = express();
var router = express.Router();
var productController = require('./controllers/products');

app.use("/api", router);

router.route("/products").get(productController.getProducts);
router.route("/product").get(productController.getProduct);
router.route("/addProduct").post(productController.addProduct);
router.route("/updateProduct").post(productController.updateProduct);
router.route("/deleteProduct").get(productController.deleteProduct);

var server = app.listen(3000, function () {
	
	var host = server.address().address;
	var port = server.address().port;

	console.log("server is listening at: %s on port %s", host, port);
});