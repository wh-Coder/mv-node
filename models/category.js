/**
 * Created by Administrator on 2017-04-25.
 */
var mongoose = require('mongoose');

var categoriesSchema = require('../schemas/categories');

module.exports = mongoose.model('Category', categoriesSchema);