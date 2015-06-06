var express = require('express');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();

//app.use(logger('myapp'));
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
//app.use(methodOverride('X-HTTP-Method-Override','PUT'));

if('development' == app.get('env')) {
	app.use(errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
}

if('production' == app.get('env')) {
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

app.get('/products/new', function(req, res) {
	res.render('products/new', {product: req.body && req.body.product || products.new});
});

app.post('/products', function(req, res) {
	var id = products.insert(req.body.product);
	console.log('id: ' + id);
	console.log('product: ' + req.body.product.name);
	res.redirect('/products/' + id);
});

app.get('/products/:id', function(req, res) {
	var product = products.find(req.params.id);
	res.render('products/show', {product: product});
});

app.get('/products/:id/edit', function(req, res) {
	var product = products.find(req.params.id);
	res.render('products/edit', {product: product});
});

app.post('/products/:id', function(req, res) {
	var id = req.params.id;
	products.set(id, req.body.product);
	res.redirect('/products/' + id);
});

app.listen(4000);
