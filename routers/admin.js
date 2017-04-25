/**
 * Created by busyrat on 2017/4/19.
 */
var express = require('express');
var router = express.Router();

var User = require('../models/user');
router.use(function (req, res, next) {
    if (!req.userInfo.isAdmin) {
        res.send('对不起，只有管理人员才能进')
        return;
    }
    next();
});

router.get('/', (req, res, next) => {
    res.render('admin/index', {
        userInfo: req.userInfo
    });
});

router.get('/user', (req,res) => {
    User.find().then(function (users) {
        res.render('admin/user_index', {
            userInfo: req.userInfo,
            users: users
        });
    });


});

module.exports = router;