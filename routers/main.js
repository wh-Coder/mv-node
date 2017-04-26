/**
 * Created by busyrat on 2017/4/19.
 */
var express = require('express');

var router = express.Router();

var Category = require('../models/category');
var Content = require('../models/content');

router.get('/user', (req, res, next) => {

    let data = {
        userInfo: req.userInfo,
        categories: [],
        page: Number(req.query.page || 1),
        limit: 2,
        pages: 0,
        count: 0,
        contents: []
    };

    Category.find().then(function (categories) {
        data.categories = categories;
        return Content.count();
    }).then(function (count) {
        data.count = count;
        data.pages = Math.ceil(data.count / data.limit);
        data.page = Math.min(data.page, data.pages);
        data.page = Math.max(data.page, 1);
        let skip = (data.page - 1) * data.limit;
        return Content.find().sort({addTime: -1}).limit(data.limit).skip(skip).populate(['category','user']);
    }).then(function (contents) {
        data.contents = contents;
        res.render('main/index', data);
        console.log(data);
    })
});

module.exports = router;
