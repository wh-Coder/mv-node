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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    addTime: {
        type: Date,
        default: new Date()
    },

    views: {
        type: Number,
        default: 0
    },

    description: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: ''
    }
});

