/**
 * Created by busyrat on 2017/4/19.
 */
var express = require('express');

var router = express.Router();

router.get('/user', (req, res, next) => {
    res.send('admin-user');
});

module.exports = router;