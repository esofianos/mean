var express = require('express');
var fs = require('fs')
var util = require('util');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var bodyParser = require('body-parser');
var multer = require('multer');
var methodOverride = require('method-override');

var app = express();

var products = require('./products');
var photos = require('./photos');

//app.use(logger());
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser({ keepExtensions: true, uploadDir: __dirname + '/static/uploads/photos/' }));
app.use(methodOverride());
app.use(multer());

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


app.get('/products', function(req, res) {
	res.render('products/index', {products: products.all});
});

app.get('/products/new', function(req, res) {
	photos.list(function(err, photo_list) {
		if(err) {
			throw err;
		}
		res.render('products/new', {product: req.body && req.body.product || products.new, photos: photo_list});
	});
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
	photos.list(function(err, photo_list) {
		if(err) {
			throw err;
		}
		res.render('products/edit', {product: product, photos: photo_list});
	});
});

app.post('/products/:id', function(req, res) {
	var id = req.params.id;
	products.set(id, req.body.product);
	res.redirect('/products/' + id);
});

/* Photos */

app.get('/photos', function(req, res) {
	photos.list(function(err, photo_list) {
		if(err) {
			throw err;
		}
		res.render('photos/index', {photos: photo_list});
	});
});

app.get('/photos/new', function(req, res) {
	res.render('photos/new');
});

app.post('/photos', function(req, res) {

        console.log('photos');
	var photo = req.files.photo;

	if(photo.size === 0) {
		console.log('empty file uploaded');
		fs.unlinkSync(photo.path);
		res.send('empty file uploaded');
	} else {
		var fn = photo.path.split('/');
		fs.rename(photo.path, photo.path.replace(fn[fn.length-1], photo.name));
		res.redirect('/photos');
	}
});

app.listen(4000);
