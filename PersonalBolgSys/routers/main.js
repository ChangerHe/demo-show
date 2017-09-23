/**
 * Created by Administrator on 2017/9/16.
 */
var express = require('express')

// 加载express下的路由模块
var router = express.Router()

// 使用
router.get('/', function(req, res, next) {
    res.send('首页')
})

module.exports = router