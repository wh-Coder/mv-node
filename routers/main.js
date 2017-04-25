/**
 * Created by busyrat on 2017/4/19.
 */
var express = require('express');

var router = express.Router();

var Category = require('../models/category');

router.get('/user', (req, res, next) => {

    Category.find().then(function (categories) {
        res.render('main/index',{
            userInfo: req.userInfo,
            categories: categories
        });
    })
});

module.exports = router;
