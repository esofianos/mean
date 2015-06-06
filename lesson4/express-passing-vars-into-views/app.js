var express = require('express');
var logger = require('morgan');
var errorHandler = require('errorhandler');

var app = express();

app.use(logger('dev'));
app.use(express.static(__dirname + '/static'));

if ('development' == app.get('env')) {
	app.use(errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
}

if ('production' == app.get('env')) {
	app.use(errorHandler());
}

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function(req, res) {
	res.render('root');
});

var products = require('./products');

app.get('/products', function(req, res) {
	res.render('products/index', {products: products.all});
});

app.get('/products/:id', function(req, res) {
	var product = products.find(req.params.id);
	res.render('products/show', {product: product});
});

app.listen(4000);
