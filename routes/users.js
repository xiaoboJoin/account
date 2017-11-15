var express = require('express');
var router = express.Router();
var request = require('request');
var UserModel = require('../model/userModel.js');

// router.get('users', function(req, res, next) {
//     if (req.params.name == 'admin',) {}

// })

/* GET users listing. */
router.post('/weixin/', function(req, res, next) {
    if (!req.body || !req.body.code) {
        if (req.body.type == 'app') {
            weixin_app_authorization(req.body.code, function(err, data) {
                if (err) {
                    res.send(err);
                } else {
                    findWeixinUser({ openid: data.openid }, function(err, user) {
                        if (err) {
                            data.type = 'app';
                            insertWeixinUser(data, function(err, user) {
                                if (err) {
                                    res.send({
                                        code: -1.
                                        message: '微信授权失败!',
                                    })
                                } else {
                                    res.send({
                                        code: 0,
                                        message: '',
                                        data: user,
                                    })
                                }
                            })
                        } else {
                            res.send({
                                code: 0,
                                message: '',
                                data: user,
                            })
                        }
                    })
                }
            })
        } else if (req.body.type == 'mapp') {} {
            weixin_mapp_authorization(req.body.code, function(err, data) {
                if (err) {
                    res.send(err);
                } else {
                    findWeixinUser({ openid: data.openid }, function(err, user) {
                        if (err) {
                            data.type = 'mapp';
                            insertWeixinUser(data, function(err, user) {
                                if (err) {
                                    res.send({
                                        code: -1.
                                        message: '微信授权失败!',
                                    })
                                } else {
                                    res.send({
                                        code: 0,
                                        message: '',
                                        data: user,
                                    })
                                }
                            })
                        } else {
                            res.send({
                                code: 0,
                                message: '',
                                data: user,
                            })
                        }
                    })
                }
            })
        } else {
            res.send({
                code: -1,
                message: '参数错误',
            });
        }
    } else {
        res.send({
            code: -1,
            message: '参数错误',
        });
    }
});

router.post('/register', function(req, res, next) {

});

router.post('/login', function(req, res, next) {

});

router.get('/logout', function(req, res, next) {

});


function weixin_app_authorization(code, cb) {
    var appid = '';
    var secret = '';
    var url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appid + '&secret=' + secret + '&code=' + code + '&grant_type=authorization_code';
    request(url, function(error, response, body) {
        if (response.statusCode == 200) {
            if (body.errcode) {
                cb({
                    code: body.errcode,
                    message: body.errmsg,
                });
            } else {
                cb(null, body);
            }
        } else {
            cb({
                code: -1,
                message: 'weixin authorizate failed!',
            })
        }
    });
}


function weixin_mapp_authorization(code, cb) {
    //礼金簿
    var appid = 'wx0075a4b06539973f';
    var secret = 'c41892d77ea156492b70750c43cf3c68';
    var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code';
    request(url, function(error, response, body) {
        if (response.statusCode == 200) {
            var body = JSON.parse(body);
            if (body.errcode) {
                cb({
                    code: body.errcode,
                    message: body.errmsg,
                });
            } else {
                cb(null, body);
            }
        } else {
            cb({
                code: -1,
                message: 'weixin authorizate failed!',
            })

        }
    });
}


function findWeixinUser(options, cb) {
    var openid = options.openid;
    UserModel.findOne({ openid: openid }, function(err, user) {
        cb(err, user);
    })
}

function insertWeixinUser(options, cb) {
    var user = new UserModel({});
    user.weixin.type = options.type; //app 和 小程序
    user.weixin.openid = options.openid || "";
    user.weixin.unionid = options.unionid || "";
    user.weixin.nickname = options.nickname || "";
    user.weixin.gender = options.gender || "";
    user.weixin.city = options.city || "";
    user.weixin.province = options.province || "";
    user.weixin.country = options.country || "";
    user.weixin.avatarUrl = options.avatarUrl || "";
    user.weixin.access_token = options.access_token || "";
    user.weixin.expires_in = options.expires_in;
    user.weixin.refresh_token = options.refresh_token || "";
    user.save(function(err, u) {
        cb(err, u)
    });

}

function updateWeixinUser(options, cb) {

}





module.exports = router;