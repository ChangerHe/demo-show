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
    var shopCartNum = memberMsg.itemMsg.length - 1
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

// 这里将解析的字符串进行循环,取出相应的值
// 取到商品的数组
var itemMsg = memberMsg.itemMsg
for (var i = 1; i < itemMsg.length; i++) {
    var itemDesc = itemMsg[i].itemDesc
    var itemImg = itemMsg[i].itemImg
    var itemName = itemMsg[i].itemName
    var itemNumber = itemMsg[i].itemNumber
    var itemPrice = itemMsg[i].itemPrice
    var listStr = '<ul class="formsContent J_descripe">\
<li class="check"><input class="selector" type="checkbox"></li>\
<li class="itemMsg"><span class="imgCon"><img class="J_img" src=' + itemImg + ' alt=""></span>\
    <p class="intro J_name"><a href="">' + itemName + '</a></p>\
    <p class="intro J_desc">' + itemDesc + '</p>\
</li>\
<li class="price J_price">' + itemPrice + '</li>\
<li class="itemNum"><input type="button" class="reduce" value="-"><input type="text" class="msgInput" value="' + itemNumber + '"><input type="button" class="add" value="+"></li>\
<li class="countPrice">' + itemPrice * itemNumber + '</li>\
<li class="option"> <a href="">删除</a><br><a href="">移到我的关注</a> </li>\
</ul>'
    $('.J_itemContent').append(listStr)
}


// 购物车的逻辑交互区域---------------------------
$('.selectAllItem').click(function() {
    var checkBool = $(this).prop('checked')
    $('.selectAllItem').each(function() {
        $(this).prop('checked', checkBool)
    })
    $('.selector').prop('checked', checkBool)
})