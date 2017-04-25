/**
 * Created by busyrat on 2017/4/25.
 */
var mongoose = require('mongoose');

var contentsSchema = require('../schemas/contents');

module.exports = mongoose.model('Content', contentsSchema);