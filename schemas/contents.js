/**
 * Created by busyrat on 2017/4/25.
 */
var mongoose = require('mongoose');

module.exports = new mongoose.Schema({

    // 关联字段
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    title: String,
    description: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: ''
    }
});

