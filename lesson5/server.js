var express = require('express');
var app = express();
var router = express.Router();
var productController = require('./controllers/products');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/products");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use("/api", router);

router.route("/products").get(productController.getProducts);
router.route("/product/:productId").get(productController.getProduct);
router.route("/addProduct").post(productController.addProduct);
router.route("/updateProduct/:productId").post(productController.updateProduct);
router.route("/deleteProduct/:productId").get(productController.deleteProduct);

var server = app.listen(3000, function () {
	
	var host = server.address().address;
	var port = server.address().port;

	console.log("server is listening at: %s on port %s", host, port);
});