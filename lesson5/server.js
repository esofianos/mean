var express = require('express');
var app = express();
var api = express.Router();
var router = express.Router();
var productController = require('./controllers/products');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/products");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use("/", router);
router.route("/products").get(productController.renderProducts);
router.route("/products").post(productController.saveAndRenderProduct);
router.route("/product/:productId").get(productController.renderProduct);
router.route("/products/new").get(productController.renderNewProduct);

app.use("/api", api);

api.route("/products").get(productController.getProducts);
api.route("/product/:productId").get(productController.getProduct);
api.route("/addProduct").post(productController.addProduct);
api.route("/updateProduct/:productId").put(productController.updateProduct);
api.route("/deleteProduct/:productId").get(productController.deleteProduct);

var server = app.listen(3000, function () {
	
	var host = server.address().address;
	var port = server.address().port;

	console.log("server is listening at: %s on port %s", host, port);
});