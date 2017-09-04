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

// 将json值解析到商品列表
// 插入数据前,将表格中原有的数据清空
$('.J_itemContent').html('')

// 总商品数量
var totalItemNum = 0;

// 总商品金额
var totalItemPrice = 0;


try {
    var itemMsg = memberMsg.itemMsg
    for (var i = 0; i < itemMsg.length; i++) {
        var itemDesc = itemMsg[i].itemDesc
        var itemImg = itemMsg[i].itemImg
        var itemName = itemMsg[i].itemName
        var itemNumber = itemMsg[i].itemNumber
        var itemPrice = itemMsg[i].itemPrice
        totalItemNum += parseInt(itemNumber)
        totalItemPrice += parseFloat(itemPrice) * parseFloat(itemNumber)
        console.log(totalItemPrice)
        var listStr = '<ul class="item J_product">\
        <li class="img"><img class="J_img" src="' + itemImg + '" alt=""></li>\
        <li class="name J_name">' + itemName + '</li>\
        <li class="price J_price">' + itemPrice + '</li>\
        <li class="itemNum J_itemShopCartNumber">' + itemNumber + '</li>\
        <li class="haveGoods">有货</li>\
    </ul>';

        $('.J_itemContent').append(listStr)
    }
} catch (e) {}

// 将总商品数量渲染进页面
$('.J_totalItemNum').text(totalItemNum)

// 将总价格渲染进页面
$('.J_totalItemPrice').text(totalItemPrice.toFixed(2))

// 算出包括运费的应付价格
var a = totalItemPrice + parseFloat($('.J_sendPrice').text())
$('.J_iNeedToPay').text(a.toFixed(2))


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
    var totalItemPrice = $('.J_totalItemPrice').text()
    var iNeedToPay = $('.J_iNeedToPay').text()
    console.log(totalItemPrice, iNeedToPay)
    memberMsg.totalItemPrice = totalItemPrice
    memberMsg.iNeedToPay = iNeedToPay
    console.log(memberMsg)
    var memberMsgStr = JSON.stringify(memberMsg)
    localStorage.setItem('username', memberMsgStr)
})


// 将蒙层居中
// 为了保证调用时就是居中的,添加一个窗口移动时间,窗口移动就会自动居中
$(window).resize(function() {
    center('.outWindow')
})