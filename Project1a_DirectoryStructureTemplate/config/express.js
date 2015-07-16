var express = require('express');

module.exports = function(){
    var app = express();
    var routes = require('../app/routes/index.server.routes.js');
    routes(app);
    return app;
}