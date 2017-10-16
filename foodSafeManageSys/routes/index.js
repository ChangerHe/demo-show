var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/foodSys', (err) => {
  if(err) throw err
  console.log('数据库链接成功...')
})

// var adminSchema = new mongoose.Schema()
var userSchema = new mongoose.Schema({
    username : String,
    password : String,
    name : String,
    role : String,
    department : String,
    sortnum : Number,
    checknum : Number,
    
})

var logSchema = new mongoose.Schema({
    username: String, // 操作用户名
    optime: Date, // 操作时间
    content: String, // 操作内容
    result: String, // 操作结果
    ip: String,  // ip地址
})

// var adminModel = mongoose.model('admin', adminSchema, 'admin')
var userModel = mongoose.model('user', userSchema, 'user')
var logModel = mongoose.model('log', logSchema, 'log')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 检查登录状态的路由
router.get('/validateLogState.html', function(req, res, next) {
  if(req.cookies.logUser) {
    res.send('1')
  } else {
    res.send('alert("请先登陆再操作");location.href=("./login.html")')
  }
});

// 获取所有的管理员列表的路由
router.get('/getList.html', function(req, res, next) {
    userModel.find().exec((err, data) => {
        if(err) res.send()
        res.send(data)
    })
});

// 返回到登录页的路由
router.get('/backToLogin.html', function(req, res, next) {
  res.clearCookie("logUser")
  res.send("<script>alert('退出成功');location.href= '/admin/pages/login.html'</script>")
});

// 查询用户是否存在的路由
router.post('/checkuser.html', function(req, res, next) {
  var username = req.body.username
  var password = req.body.password
    
    userModel.findOne({'username':username,'password':password}).exec((err, data) => {
    if(data) {
      writeLog('用户: ' + username + ' 尝试登陆', '成功', req)
      res.cookie('logUser', username)
      res.send('1')
    } else {
      writeLog('用户: ' + username + ' 尝试登陆', '失败', req)
      res.send('0')
    }
  })
});

// 查询用户信息的路由
router.get('/getUserById.html', function(req, res, next) {
  var id = req.query.id
    
    userModel.findOne({'_id':id}).exec((err, data) => {
    if(data) {
      writeLog('查询用户: ' + data.username, '成功', req)
      res.send(data)
    } else {
        writeLog('查询用户: ' + data.username, '失败', req)
      res.send('0')
    }
  })
});

// 添加用户的路由
router.post('/addUser.html', function(req, res) {
    var username = req.body.username
    var password = req.body.password
    var name = req.body.name
    var role = req.body.role
    var department = req.body.department
    var sortnum = req.body.sortnum
    var checknum = req.body.checknum
    userModel.findOne({'username':username}).exec((err, data) => {
        if(data) {
            writeLog('添加用户: ' + data.username, '失败', req)
            res.send('0')
        } else {
            var newuser = new userModel()
            newuser.username = username
            newuser.password = password
            newuser.name = name
            newuser.role = role
            newuser.department = department
            newuser.sortnum = sortnum
            newuser.checknum = checknum
            
            newuser.save(function(err){
                if(err) {
                    writeLog('保存添加用户: ' + username, '失败', req)
                }
                // 添加日志
                writeLog('添加用户: ' + username, '成功', req)
                // console.log(this)
                userModel.find().exec((err, alldata) => {
                    res.send(alldata)
                })
            })
            
        }
    })
})

// 编辑用户,并显示所有用户的路由
router.post('/editUser.html', function(req, res) {
    var username = req.body.username
    var password = req.body.password
    var name = req.body.name
    var role = req.body.role
    var department = req.body.department
    var sortnum = req.body.sortnum
    var checknum = req.body.checknum
    var id = req.body.id
    userModel.findOne({'_id':id}).exec((err, data) => {
        if(data) {
            data.username = username
            data.password = password
            data.name = name
            data.role = role
            data.department = department
            data.sortnum = sortnum
            data.checknum = checknum
    
            data.save(function(err){
                if(err) throw err
                userModel.find().exec((err, alldata) => {
                    writeLog('修改用户: ' + data.username + ' 的信息', '成功', req)
                    res.send(alldata)
                })
            })
        } else {
            writeLog('修改用户: ' + data.username + ' 的信息', '失败', req)
            res.send('0')
        }
    })
})

// 删除对应用户的路由
router.post('/deleteItem.html', function(req, res) {
    var id = req.body.id
    var idArr = JSON.parse(id)
    console.log(idArr)
    userModel.find({'_id': {$in: idArr}}).exec((err, data) => {
        var usernameArr = []
        data.forEach((v, i) => {
            usernameArr.push(new Promise((resolve, reject) => {
                v.remove(function(err, data) {
                    if(err) {
                        reject(data.username)
                        writeLog('删除用户: ' + data.username, '失败', req)
                        throw err
                    }
    
                    resolve(data.username)
                })
            }))
        })
        Promise.all(usernameArr).then(function(datas) {
            writeLog('删除用户: ' + datas.join(','), '成功', req)
        })
        res.send('1')
    })
})

// 分页效果的路由
router.get('/countPage.html', function(req, res) {
    // 预定义每页显示条数
    var itemNum = 5
    
    // 通过get请求来获知请求的具体是哪一页
    var curPage = req.query.page || 1
    curPage = parseInt(curPage)
    var obj = {}
    
    // 按条件查询,传入了条件才查询,没有传入条件,这个条件是不用传入到对象中的
    if(req.query.department) {
        obj.department = req.query.department
    }
    
    if(req.query.role) {
        obj.role = req.query.role
    }
    
    if(req.query.username) {
        var username = new RegExp(req.query.username, 'g')
        
        obj.username = username
    }
    
    // 预定义页数变量
    var page
    userModel.find(obj).exec((err, data) => {
        if(err) throw err
        page = Math.ceil(data.length / itemNum)
        var start =curPage*itemNum-itemNum
        userModel.find(obj).sort({'username': 1}).skip(start).limit(itemNum).exec((err, data) => {
            if(err) throw err
            data.push(page)
            console.log(start)
            res.send(data)
        })
    })
})

// 查询用户的路由
router.get('/searchUser.html', function(req, res) {
    var obj = {}
    var department = req.query.department
    var role = req.query.role
    var username = req.query.username

    // 按条件查询,传入了条件才查询,没有传入条件,这个条件是不用传入到对象中的
    if(department !== '全部') {
        obj.department = department
    }

    if(role !== '全部') {
        obj.role = role
    }

    if(username.length > 0) {
        obj.username = username
    }

    res.send(JSON.stringify(obj))
    
})


// 修改密码的路由
router.post('/confirmUsername.html', function(req, res) {
    var username = req.cookies.logUser
    var password = req.body.password
    var newPassword
    if(req.body.newPassword) {
        newPassword = req.body.newPassword
    }
    
    userModel.find({'username': username, password: password}).exec((err, data) => {
        if(err) throw err
        if(data.length) {
            if(newPassword) {
                data[0].password = newPassword
                data[0].save((err) => {
                    if(err) throw err
                    writeLog('修改用户: ' + data.username + ' 的密码', '成功', req)
                    res.send('1')
                })
            }
            
        } else {
            writeLog('修改用户: ' + data.username + ' 的密码', '失败', req)
            res.send('0')
        }
    })
})

// 获取所有日志的路由
router.get('/getLog.html', function(req, res) {
    logModel.find().exec((err, data) => {
        res.send(data)
    })
})


// 定义一个写入操作日志的函数
function writeLog(content, result, req) {
    // 写入日志
    var log = new logModel()
    log.username = req.cookies.logUser
    log.optime = new Date()
    log.content = content
    log.result = result
    log.ip = req.ip
    log.save()
}

module.exports = router;
