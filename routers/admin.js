/**
 * Created by busyrat on 2017/4/19.
 */
var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Category = require('../models/category');
var Content = require('../models/content');

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
                limit: limit,
                type: 'user'
            });
        });
    });
});

router.get('/category', function (req, res) {
    let page = Number(req.query.page || 1);
    let limit = 2;
    let pages = 0;

    Category.count().then(function (count) {
        pages = Math.ceil(count / limit);
        page = Math.min(page, pages);
        page = Math.max(page, 1);

        let skip = (page - 1) * limit;

        Category.find().sort({_id: -1}).limit(limit).skip(skip).then(function (categories) {
            res.render('admin/category_index', {
                userInfo: req.userInfo,
                categories: categories,

                count: count,
                pages: pages,
                page: page,
                limit: limit,
                type: 'category'
            });
        });
    });
});

router.get('/category/add', function (req, res) {
    res.render('admin/category_add', {
        userInfo: req.userInfo
    })
});

router.post('/category/add', function (req, res) {
    var name = req.body.name || '';

    if (name === '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '名字不能为空'
        });
    } else {
        Category.findOne({
            name: name
        }).then(function (err) {
            console.log(err);
            if (err) {
                res.render('admin/error', {
                    userInfo: req.userInfo,
                    message: '分类已经存在'
                })
                return Promise.reject();
            } else {
                return new Category({
                    name: name
                }).save();
            }
        }).then(function () {
            res.render('admin/success', {
                userInfo: req.userInfo,
                message: '分类保存成功',
                url: '/admin/category'
            })
        })
    }
});

router.get('/category/edit', function (req, res) {
    var id = req.query.id || '';

    Category.findOne({
        _id: id
    }).then(function (category) {
        if (!category) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类信息不存在'
            })
        } else {
            res.render('admin/category_edit', {
                userInfo: req.userInfo,
                category: category
            })
        }
    })
});

router.post('/category/edit', function (req, res) {
    var id = req.query.id || '';
    var name = req.body.name || '';
    Category.findOne({
        _id: id
    }).then(function (category) {
        if (!category) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类信息不存在'
            })
        } else {
            if (name === category.name) {
                res.render('admin/success', {
                    userInfo: req.userInfo,
                    message: '修改成功1',
                    url: '/admin/category'
                });
                return Promise.reject();
            } else {
                return Category.findOne({
                    _id: {$ne: id},
                    name: name
                })
            }
        }
    }).then(function (sameCategory) {
        if (sameCategory) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '存在同名',
            });
            return Promise.reject();
        } else {
            return Category.update({
                _id: id
            }, {
                name: name
            })
        }
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '修改成功2',
            url: '/admin/category'
        })
    })
});

router.get('/category/delete', function (req, res) {
    var id = req.query.id || '';

    Category.remove({
        _id: id
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '删除成功',
            url: '/admin/category'
        })
    })
});

router.get('/content', function (req, res) {
    let page = Number(req.query.page || 1);
    let limit = 2;
    let pages = 0;

    Content.count().then(function (count) {
        pages = Math.ceil(count / limit);
        page = Math.min(page, pages);
        page = Math.max(page, 1);
        let skip = (page - 1) * limit;
        Content.find().sort({_id: -1}).limit(limit).skip(skip).populate('category').populate('user').then(function (contents) {
            res.render('admin/content_index', {
                userInfo: req.userInfo,
                contents: contents,

                count: count,
                pages: pages,
                page: page,
                limit: limit,
                type: 'content'
            });
        });
    });
});

router.get('/content/add', function (req, res) {

    Category.find().sort({_id: -1}).then(function (categories) {
        res.render('admin/content_add', {
            userInfo: req.userInfo,
            categories: categories
        })
    })
});

router.post('/content/add', function (req, res) {
    // console.log(req.body);

    if (req.body.category === '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容标题不能为空'
        })
        return;
    }

    new Content({
        category: req.body.category,
        title: req.body.title,
        user: req.userInfo._id.toString(),
        description: req.body.description,
        content: req.body.content
    }).save().then(function (rs) {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '内容保存成功'
        })
    });
});

router.get('/content/edit', function (req, res) {
    var id = req.query.id || '';
    var categories = []
    Category.find().sort({_id: -1}).then(function (rs) {
        categories = rs;
        return Content.findOne({
            _id: id
        }).populate('category');
    }).then(function (content) {
        if (!content) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '内容不能为空'
            });
            return Promise.reject();
        } else {
            res.render('admin/content_edit', {
                userInfo: req.userInfo,
                content: content,
                categories: categories
            })
        }
    })

});

router.post('/content/edit', function (req, res) {
    var id = req.query.id || '';

    if (req.body.category === '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容标题不能为空'
        })
        return;
    }
    Content.update({
        _id: id
    }, {
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '修改成功2',
            url: '/admin/category'
        })
    })
});

router.get('/content/delete', function (req, res) {
    var id = req.query.id || '';

    Content.remove({
        _id: id
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '删除成功',
            url: '/admin/category'
        })
    })
});

module.exports = router;