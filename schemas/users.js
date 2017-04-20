/**
 * Created by busyrat on 2017/4/19.
 */
var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    username: String,
    password: String
});
