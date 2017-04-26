/**
 * Created by busyrat on 2017/4/19.
 */
var express = require('express');

var router = express.Router();

var Category = require('../models/category');
var Content = require('../models/content');

var data;
router.use(function (req, res, next) {
    data = {
        userInfo: req.userInfo,
        categories: []
    }
    Category.find().then(function (categories) {
        data.categories = categories;
        next();
    })

});

router.get('/user', (req, res, next) => {

    data.category = req.query.category || '';
    data.page = Number(req.query.page || 1);
    data.limit = 2;
    data.pages = 0;
    data.count = 0;
    data.contents = [];

    var where = {};
    if (data.category) {
        where.category = data.category
    }

    Content.where(where).count().then(function (count) {
        data.count = count;
        data.pages = Math.ceil(data.count / data.limit);
        data.page = Math.min(data.page, data.pages);
        data.page = Math.max(data.page, 1);
        let skip = (data.page - 1) * data.limit;

        return Content.where(where).find().sort({addTime: -1}).limit(data.limit).skip(skip).populate(['category', 'user']);
    }).then(function (contents) {
        data.contents = contents;
        res.render('main/index', data);
        console.log(data);
    })
});

router.get('/view', function (req, res) {
    var contentId = req.query.contentid || '';
    Content.findOne({
        _id: contentId
    }).then(function (content) {
        data.content = content;

        content.views++;
        content.save();
        res.render('main/view', data);
    })
});

module.exports = router;
