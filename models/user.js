/**
 * Created by busyrat on 2017/4/20.
 */
var mongoose = require('mongoose');

var usersSchema = require('../schemas/users');

module.exports = mongoose.model('User', usersSchema);