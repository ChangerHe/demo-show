// 加载express模块
var express = require('express')

// 加载swig
var swig = require('swig')

// 创建app应用
var app = express()

// 链接数据库
var mongoose = require('mongoose')

// 要实现前后端的分离,需要加载模板
// 定义当前应用需要的模板引擎
/*
 * swig模板引擎
 * */
// 第一个参数: 模板引擎的名称,同时也是模板文件的后缀, 第二个参数表示用于解析处理模板内容的方法
app.engine('html', swig.renderFile)

// 设置模板文件存放的目录, 第一个参数必须是views, 第二个参数是目录
app.set('views', './views')

// 注册所使用的模板引擎,第一个参数必须是view engine第二个参数必须与app.engine中的第一个参数一致
app.set('view engine', 'html')

// 开发过程中需要取消模板的缓存,避免在每次更改html之后又要重新重启服务器的烦恼
// 这里面的主要原因是因为swig引擎默认是有缓存的,所以每次重新请求该页面的时候就会直接从缓存中读取数据,从而导致内容无法同步刷新,所以我们将其默认的缓存机制关闭掉,就不会存在此问题了
swig.setDefaults({cache: false})

//现在遇到一个问题就是,当我们请求html文件中的样式表文件的时候,会报出一个404的错误,这个是因为默认的情况下,服务器只会发送一次http请求,所以这个时候只会请求html页面就终止了,不会继续请求html以外的其他页面
// 那么这个时候就需要使用express中的use方法了
// 当用户访问的url以/public开始,则直接返回对应的dirname + '/public'下的文件
app.use('/public', express.static(__dirname + '/public'))

// 当用户




/*
路由绑定: 通过app.get()或者app.post()等方法可以把一个url路径和一个或n个函数进行绑定
    app.get("/", function(req, res, next){})
* req request对象-保存客户端请求相关的一些数据(http.request)
* res response对象-服务器输出对象,提供了一些服务器端输出相关的一些方法(http.response)
* next 用于执行下一个和路径匹配的函数
内容输出:  通过res.send(string) 发送内容至客户端
* */
app.get('/', function(req, res, next) {

    // res.send("<h1>欢迎光临我的博客</h1>")
    // 读取指定目录下的指定文件,解析并返回给客户端
    // 第二个参数表示传递给模板使用的数据
    res.render('index')

    // res.end()
})

// 根据不同功能划分模块
app.use('/admin', require('./routers/admin'))
app.use('/api', require('./routers/api'))
app.use('/', require('./routers/main'))

mongoose.connect('mongodb://localhost:27018/bolg', function(err) {
    if(err) {
        console.log('数据库链接失败')
    } else {
        console.log('数据库链接成功')
        // 设置监听的端口, 把监听端口放在这里,在数据库链接成功才监听端口
        app.listen(8081)
    }
})




/*
* 原理:
*   用户发送http请求
*   后端解析请求的url
*   解析路由
*   找到匹配的规则
*   执行绑定的函数
*   返回内容到客户端
* 访问的内容中有public
*   则认为是静态的方式
*   直接读取指定目录下的文件, 返回给用户
* 访问内容中无public
*   则处理业务逻辑
*   加载解析模板
*   返回数据给用户
*
* */

/*
* 分模块划分和开发
*   前台模块
*   后台管理模块
*   API模块
*
*   使用app.use进行模块划分
*       app.use('/admin', require('./router/admin'))
*       app.use('/api', require('./router/api'))
*       app.use('/', require('./router/main'))
* */

// 各个模块业务的开发
/*
* main模块
*   /     首页
*   /view 内容页
* */

/*
* api模块
*   /      `        首页
*   /register       用户注册
*   /comment        评论获取
*   /comment/post   评论提交
*
* */


/*
* admin模板
*       /               首页
*   用户管理
*       /user           用户列表
*   分类管理
*       /category       分类列表
*       /category/add   分类添加
*       /category/edit  分类修改
*       /category/delete分类删除
*   文章内容管理
*       /article        内容列表
*       /article/add    内容添加
*       /article/edit   内容修改
*       /article/delete 内容删除
*   评论内容管理
*       /comment        评论列表
*       /comment/delete 评论删除
*
* */

/*
* 功能模块开发顺序
*   用户
*   栏目
*   内容
*   评论
* 编码顺序
*   通过scheme定义设计数据存储结构
*   功能逻辑
*   页面展示
* */