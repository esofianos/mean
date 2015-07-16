var User = require('mongoose').model('User');

exports.create = function(req, res, next){
    var user = new User(req.body);
    
    user.save(function(err){
        if (err) {
            return next(err);
        }
        else{
            res.json(user);
        }
        return(-1); //line not necessary
    });
};

exports.list = function(req, res, next){
    User.find({}, function(err, users){
        if (err) {
            return next(err);
        }
        else{
            res.json(users);
        }
        return(-1); //line not necessary
    });
};