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

router.get('/user', (req, res) => {
    let page = Number(req.query.page || 1);
    let limit = 2;
    let pages = 0;

    User.count().then(function (count) {
        pages = Math.ceil(count / limit);
        page = Math.min(page, pages);
        page = Math.max(page, 1);

        let skip = (page - 1) * limit;

        User.find().limit(limit).skip(skip).then(function (users) {
            res.render('admin/user_index', {
                userInfo: req.userInfo,
                users: users,

                count: count,
                pages: pages,
                page: page,
                limit: limit
            });
        });
    });

});

module.exports = router;