/**
 * Created by Administrator on 2017/9/16.
 */
var express = require('express')

// 加载express下的路由模块
var router = express.Router()

// 使用
router.get('/user', function(req, res, next) {
    res.send('admin-User')
})

module.exports = router