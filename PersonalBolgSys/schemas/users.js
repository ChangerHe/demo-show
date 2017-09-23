/**
 * Created by Administrator on 2017/9/16.
 */

var mongoose = require('mongoose')

// 用户的表结构
module.exports = new mongoose.Schema({
    // 用户名
    username: String,
    password: String
})

