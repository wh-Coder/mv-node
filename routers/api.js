/**
 * Created by busyrat on 2017/4/19.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/user');

var responseData;

router.use( function (req, res, next) {
    responseData = {
        code: 0,
        message: ''
    }
    next();
});

router.post('/user/register', function (req, res, next) {
    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;

    if( username === '' ){
        responseData.code = 1;
        responseData.message = '用户密码不能为空';
        res.json(responseData);
        return;
    }
    if(password === ''){
        responseData.code = 2;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return;
    }
    if(password !== repassword){
        responseData.code = 3;
        responseData.message = '两次密码不一致';
        res.json(responseData);
        return;
    }

    User.findOne({
        username: username
    }).then(function (userInfo) {
        console.log(userInfo);
        if(userInfo){
            responseData.code = 4;
            responseData.message = '用户已经注册';
            res.json(responseData);
            return;
        }
        var user = new User({
            username: username,
            password:password
        });
        
        return user.save();
    }).then(function (newUserInfo) {
        console.log(newUserInfo);
        responseData.message = '注册成功';
        res.json(responseData);
    })
});

router.post('/user/login', function (req,res,next) {
    var username = req.body.username;
    var password = req.body.password;

    if(username == '' || password == ''){
        responseData.code = 1;
        responseData.message = '用户名密码不能为空';
        res.json(responseData);
        return;
    }

    User.findOne({
        username: username,
        password: password
    }).then(function (userInfo) {
        console.log(userInfo);
        if(!userInfo){
            responseData.code = 2;
            responseData.message = '用户名秘密错误';
            res.json(responseData);
            return;
        }

        responseData.message = '登录成功';
        responseData.userInfo = {
          _id: userInfo._id,
          username: userInfo.username
        };
        req.cookies.set('userInfo',JSON.stringify({
            _id: userInfo._id,
            username: userInfo.username
        }));
        res.json(responseData);
        return;
    })
});

router.get('/user/logout', function (req,res,next) {
    req.cookies.set('userInfo',null);
    res.json(responseData);
});
module.exports = router;