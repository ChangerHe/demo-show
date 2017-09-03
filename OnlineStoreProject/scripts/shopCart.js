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
var freashItemList = function() {
    // 插入数据前,将表格中原有的数据清空
    $('.J_itemContent').html('')
    var itemMsg = memberMsg.itemMsg
    for (var i = 0; i < itemMsg.length; i++) {
        var itemDesc = itemMsg[i].itemDesc
        var itemImg = itemMsg[i].itemImg
        var itemName = itemMsg[i].itemName
        var itemNumber = itemMsg[i].itemNumber
        var itemPrice = itemMsg[i].itemPrice
        var listStr = '<ul class="formsContent J_product ">\
<li class="check"><input class="selector" type="checkbox"></li>\
<li class="itemMsg"><span class="imgCon"><img class="J_img" src=' + itemImg + ' alt=""></span>\
    <p class="intro J_name"><a href="">' + itemName + '</a></p>\
    <p class="intro J_descripe">' + itemDesc + '</p>\
</li>\
<li class="price J_price">' + itemPrice + '</li>\
<li class="itemNum"><input type="button" class="reduce" value="-"><input type="text" class="msgInput" value="' + itemNumber + '"><input type="button" class="add" value="+"><span class="warning"><br>您输入的数字不合法</span></li>\
<li class="countPrice">' + itemPrice * itemNumber + '</li>\
<li class="option"> <a href="">删除</a><br><a href="">移到我的关注</a> </li>\
</ul>';
        $('.J_itemContent').append(listStr)
    }
}
freashItemList()
    // 购物车的逻辑交互区域---------------------------



// 更新整个商品列表,主要的作用是取出购物车中的商品,然后将商品的数据转为json,后再将json进行解析,插回去
var refreash = function() {
    var itemArray = [];
    // 找到商品descripe的值
    console.log($('.J_itemContent .J_product').length)
    for (var i = 0; i < $('.J_itemContent .J_product').length; i++) {
        var itemDesc = $('.J_itemContent .J_product').eq(i).find('.J_descripe').html()
            // 找到商品的图片地址
        var itemImg = $('.J_itemContent .J_product').eq(i).find('.J_img').prop('src')
            // 先定义商品的数量
        var itemNumber = 1
            // 解析出商品的价格,因为之后还是要直接转为字符,所以这里就先不转为字符串格式
        var itemPrice = ($('.J_itemContent .J_product').eq(i).find('.J_price').html()).match(/\d[\d.]+$/)[0]
            // 如果页面中没有商品的名称,则使用形容的第一句话作为商品名称
            // 因为子元素中没有name的时候,还是会返回一个对象,所以在find后面加上索引,以便找到匹配的值
        if ($('.J_itemContent .J_product').eq(i).find('.J_name')[0]) {
            var itemName = $('.J_itemContent .J_product').eq(i).find('.J_name').html()
        } else {
            var itemName = itemDesc.match(/(\S+?)(?=[,，])/)[0]
        }


        var itemObj = {
                itemDesc: itemDesc,
                itemImg: itemImg,
                itemName: itemName,
                itemNumber: itemNumber,
                itemPrice: itemPrice
            }
            // 将数组进行拼接
        itemArray = itemArray.concat(itemObj)

    }
    // 将数组插入之前的json中
    memberMsg.itemMsg = itemArray
        // json转字符串

    memberStr = JSON.stringify(memberMsg)
        // 更新localStorage

    localStorage.setItem('username', memberStr)
        // 重新解析json
    memberMsg = JSON.parse(localStorage.getItem('username'))
    freashItemList()
}
refreash()



// 设置选择框,全选的效果
$('.selectAllItem').click(function() {
        var checkBool = $(this).prop('checked')
        $('.selectAllItem').each(function() {
            $(this).prop('checked', checkBool)
        })
        $('.selector').prop('checked', checkBool)
    })
    // 点击减号,则减一
$('.reduce').click(function() {
        var thisItemNum = +$(this).next().val()
        if (thisItemNum > 1) {
            $(this).next().val(--thisItemNum)
        }
    })
    // 点击加号,则加一
$('.add').click(function() {
    var thisItemNum = +$(this).prev().val()
    $(this).prev().val(++thisItemNum)
})

// 为商品添加点击后传输数据的效果,并更新到购物车中
$('.guessULike .J_product').click(function(e) {

    // 捕捉点击的位置,为之后做动画效果做准备
    var top = e.pageY
    var left = e.pageX
        // 找到商品descripe的值
    var itemDesc = $(this).find('.J_descripe').html()
        // 找到商品的图片地址
    var itemImg = $(this).find('.J_img').prop('src')
        // 先定义商品的数量
    var itemNumber = 1
        // 解析出商品的价格,因为之后还是要直接转为字符,所以这里就先不转为字符串格式
    var itemPrice = ($(this).find('.J_price').html()).match(/\d+$/)[0]
        // 如果页面中没有商品的名称,则使用形容的第一句话作为商品名称
        // 因为子元素中没有name的时候,还是会返回一个对象,所以在find后面加上索引,以便找到匹配的值
    if ($(this).find('.J_name')[0]) {
        var itemName = $(this).find('.J_name').html()
    } else {
        var itemName = itemDesc.match(/(\S+?)(?=[,，])/)[0]
    }


    var itemObj = {
        itemDesc: itemDesc,
        itemImg: itemImg,
        itemName: itemName,
        itemNumber: itemNumber,
        itemPrice: itemPrice
    }

    try {
        // 如果购物车中已有该商品,则只需要增加该商品的数量即可,不需要重复添加
        // 所以,我们先循环存在的购物车内商品
        for (var i in memberMsg.itemMsg) {
            // 如果会员信息中的商品信息的商品名称和点击到的商品名称相同,则该商品数量加一
            if (memberMsg.itemMsg[i].itemName == itemName) {
                console.log(memberMsg)
                memberMsg.itemMsg[i].itemNumber++;
                // 因为这里只增加了数量,因此需要更新一下localStorage
                var memberStr = JSON.stringify(memberMsg)
                localStorage.setItem('username', memberStr)
                    // 加一后面就不用再写逻辑了,直接返回即可
                return
            }
        }
        // 将memberMsg的itemMsg信息更新,也就是将相应的商品json信息更新
        memberMsg.itemMsg[memberMsg.itemMsg.length] = itemObj
            // 更新页面显示的shopCartNum,也就是购物车中的商品数量
        shopCartNum = memberMsg.itemMsg.length - 1
            // 使用插件更新页面的显示数量,将更新的商品数量增加到页面中
        $(window).pub({
            shopCarNum: shopCartNum // 提供购物车的数量
        })
        memberStr = JSON.stringify(memberMsg)
            // 更新localStorage
        localStorage.setItem('username', memberStr)
        console.log(localStorage.getItem(memberMsg))
    } catch (e) {}
})