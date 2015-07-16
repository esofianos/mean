var users = require('../../app/controllers/user.server.controller');


module.exports = function(app){
    app.route('/users').post(users.create); // post to create a user
    app.route('/users').get(users.list); // get the list of users
}