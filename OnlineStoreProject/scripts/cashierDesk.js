// 一下区域为每个页面均可共用的公共信息更新区域-------------------
// localStorage.clear()
try {
    // 解析localStorage的字符串
    var memberMsg = JSON.parse(localStorage.getItem('username'))
        // 将取到的值进行定义,方便后面进行校验
        // 用户名位解析之后的名称
    var username = memberMsg.username
        // 密码为解析到的密码
    var password = memberMsg.password
        // 购物车的商品数量,为itemMsg的数量减一,因为第0个是之前做的模板
    var shopCartNum = memberMsg.itemMsg.length
} catch (e) {}
// 如果页面存在了localStorage,则欢迎页面直接显示会员的名称
if (!!username) {
    // 取到会员信息的区域,写入会员的信息
    $('.memberInfo').html('<a href="memberCenter.html">' + username + '</a>')
} else {
    // 否则,显示提示登陆的效果
    $('.memberInfo').html('请&nbsp;<a href="login.html">登陆</a>/<a href="register.html">注册</a>')
}

// 使用自己写的插件对首页的内容进行统一的更改插件,主要还是起到初始化的作用,后面添加商品的时候再进行更新
$(window).pub({
    // 如果shopCartNum为空,这里不会抛错,所以不用捕捉
    shopCarNum: shopCartNum, // 提供购物车的数量
})


// 打印出localStorage的状态,以便随时跟进
console.log(JSON.parse(localStorage.getItem('username')))

// 公共信息更新区域结束------------------------------------------

try {

    // 解析出商品的总价
    var totalItemPrice = memberMsg.totalItemPrice

    // 解析出我需要支付的金额
    var iNeedToPay = memberMsg.iNeedToPay
} catch (error) {

}





// 赋值到相应位置
$('.J_iNeedToPay').text(iNeedToPay)
$('.J_totalItemPrice').text(totalItemPrice)

// 蒙层
// 为提交按钮绑定事件
$('.J_sendItem').click(function() {
    $('.J_fillAllPage,.J_outWindow').css('display', 'block')
    center('.outWindow')
})

$('.cancelBlock').click(function() {
    $('.J_fillAllPage,.J_outWindow').css('display', 'none')
})

$('.J_fillAllPage').click(function() {
    $('.J_fillAllPage,.J_outWindow').css('display', 'none')
})
$('.confirmBlock').click(function() {
    alert('付款成功')
})