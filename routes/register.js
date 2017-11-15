var UserModel = require('../model/userModel.js');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    var user = UserModel({
        username: "bob",
        password: "123",
    })
    user.save(function(err) {
        if (err) {
            res.send("failed");
        } else {
            res.send("success");
        }

    })

});

module.exports = router;