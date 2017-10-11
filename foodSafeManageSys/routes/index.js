var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/foodSys', (err) => {
  if(err) throw err
  console.log('数据库链接成功...')
})

var adminSchema = new mongoose.Schema()
var userSchema = new mongoose.Schema({
    username : String,
    password : String,
    name : String,
    role : String,
    department : String,
    sortnum : Number,
    checknum : Number,
    
})

var adminModel = mongoose.model('admin', adminSchema, 'admin')
var userModel = mongoose.model('user', userSchema, 'user')

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
      res.cookie('logUser', username)
      res.send('1')
    } else {
      res.send('0')
    }
  })
});

// 查询用户信息的路由
router.get('/getUserById.html', function(req, res, next) {
  var id = req.query.id
    
    userModel.findOne({'_id':id}).exec((err, data) => {
    if(data) {
      res.send(data)
    } else {
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
    console.log(username)
    userModel.findOne({'username':username}).exec((err, data) => {
        console.log(data)
        if(data) {
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
            
            newuser.save(function(){
                var arg2 = arguments[1]
                userModel.find().exec((err, alldata) => {
                    // alldata.push(arg2)
                    // console.log(alldata)
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
    console.log(username)
    userModel.findOne({'_id':id}).exec((err, data) => {
        console.log(data)
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
                    res.send(alldata)
                })
            })
        } else {
            res.send('0')
        }
    })
})

// 删除对应用户的路由
router.post('/deleteItem.html', function(req, res) {
    var id = req.body.id
    var idArr = JSON.parse(id)
    
    userModel.find({'_id': {$in: idArr}}).exec((err, data) => {
        data.forEach((v, i) => {
            v.remove(function(err, data) {
                if(err) throw err
                res.send('1')
            })
        })
    })
})

// 分页效果的路由
router.get('/countPage.html', function(req, res) {
    // 预定义每页显示条数
    var itemNum = 5
    
    // 通过get请求来获知请求的具体是哪一页
    var curPage = req.query.page || 1
    
    // 预定义页数变量
    var page
    userModel.find().exec((err, data) => {
        if(err) throw err
        page = Math.ceil(data.length / itemNum)
        
        
        userModel.find().skip(curPage*itemNum-itemNum).limit(itemNum).exec((err, data) => {
            if(err) throw err
            data.push(page)
            res.send(data)
        })
    })
    
    
})

module.exports = router;
