var config = require('./config');
var express = require('express');
var morgan = require('morgan');
var compress = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');

module.exports = function(){
    var app = express();
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev')); //logging so we can see our problems
    }
    else if (process.env.NODE_ENV === 'production') {
        app.use(compress()); //compression to make things smaller
    }
    
    app.use(bodyParser.urlencoded({
        extended: true //parsing any type
    }));
    
    app.use(bodyParser.json());
    app.use(methodOverride());
    
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));
    
    app.set('views', './app/views'); //the view directory
    app.set('view engine', 'ejs'); //view engine
    
     require('../app/routes/index.server.routes.js')(app);
     require('../app/routes/user.server.routes.js')(app);
   
    app.use(express.static('./public')); //the directory containing static files
   
   
   
    return app;
}