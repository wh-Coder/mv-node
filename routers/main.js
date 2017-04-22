/**
 * Created by busyrat on 2017/4/19.
 */
var express = require('express');

var router = express.Router();

router.get('/user', (req, res, next) => {

    console.log(req.userInfo._id);

    res.render('main',{
        userInfo: req.userInfo
    });
});

module.exports = router;