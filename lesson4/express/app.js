var express = require('express');
var logger = require('morgan');
var errorHandler = require('errorhandler');

var app = express();

if ('development' == app.get('env')) {
	app.use(logger('dev'));
	app.use(errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
}

if ('production' == app.get('env')) {
	app.use(logger());
	app.use(errorHandler());
}

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', {layout:true});

app.get('/', function(req, res) {
	res.render('root');
});

app.listen(4000);
