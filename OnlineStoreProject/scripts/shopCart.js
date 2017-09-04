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
// 这里要先执行一下这个函数,因为页面加载的时候商品就要渲染进来
freashItemList()

// 因为出现了刷新之后金额归零的情况,所以这里将页面金额改变的函数进行一次执行
cartPageNum()

// 这里将解析的字符串进行循环,取出相应的值
// 取到商品的数组
function freashItemList() {
    // 插入数据前,将表格中原有的数据清空
    $('.J_itemContent').html('')

    try {
        var itemMsg = memberMsg.itemMsg
        for (var i = 0; i < itemMsg.length; i++) {
            var itemDesc = itemMsg[i].itemDesc
            var itemImg = itemMsg[i].itemImg
            var itemName = itemMsg[i].itemName
            var itemNumber = itemMsg[i].itemNumber
            var itemPrice = itemMsg[i].itemPrice

            // 经过测试,checked为false的时候,仍旧会显示为选中状态,所以这里做一个三目判断
            var checkNow = itemMsg[i].checkNow ? 'checked = ""' : "";
            var listStr = '<ul class="formsContent J_product ">\
<li class="check"><input class="selector" type="checkbox" ' + checkNow + '></li>\
<li class="itemMsg"><span class="imgCon"><img class="J_img" src=' + itemImg + ' alt=""></span>\
    <p class="intro J_name">' + itemName + '</p>\
    <p class="intro J_descripe">' + itemDesc + '</p>\
</li>\
<li class="price J_price">' + parseFloat(itemPrice).toFixed(2) + '</li>\
<li class="itemNum"><input type="button" class="reduce" value="-"><input type="text" class="msgInput J_itemShopCartNumber" value="' + itemNumber + '"><input type="button" class="add" value="+"><span class="warning"><br>您输入的数字不合法</span></li>\
<li class="countPrice">&yen; : ' + parseFloat(itemPrice * itemNumber).toFixed(2) + '</li>\
<li class="option"> <a class="deleteThisItem" href="javascript:void(0)">删除</a><br><a href="javascript:void(0)">移到我的关注</a> </li>\
</ul>';
            $('.J_itemContent').append(listStr)
        }
    } catch (e) {}
}

// 购物车的逻辑交互区域---------------------------



// 更新整个商品列表,主要的作用是取出购物车中的商品,然后将商品的数据转为json,后再将json进行解析,插回去
function refreash() {
    var itemArray = [];
    // 找到商品descripe的值
    for (var i = 0; i < $('.J_itemContent .J_product').length; i++) {
        var itemDesc = $('.J_itemContent .J_product').eq(i).find('.J_descripe').html()

        // 找到商品的图片地址
        var itemImg = $('.J_itemContent .J_product').eq(i).find('.J_img').prop('src')

        // 先定义商品的数量
        var itemNumber = $('.J_itemContent .J_product').eq(i).find('.J_itemShopCartNumber').val()

        // 解析出商品的价格,因为之后还是要直接转为字符,所以这里就先不转为字符串格式
        var itemPrice = ($('.J_itemContent .J_product').eq(i).find('.J_price').html()).match(/\d[\d.]+$/)[0]

        // 因为出现了点击加减之后,选择框会自动取消选中,导致总金额马上归零的情况,所以这里再额外增加一个键值对,存储是否被选中
        var checkNow = $('.J_itemContent .J_product').eq(i).find('.selector').prop('checked')

        // 如果页面中没有商品的名称,则使用形容的第一句话作为商品名称
        // 因为子元素中没有name的时候,还是会返回一个对象,所以在find后面加上索引,以便找到匹配的值
        if ($('.J_itemContent .J_product').eq(i).find('.J_name')[0]) {
            var itemName = $('.J_itemContent .J_product').eq(i).find('.J_name').html()
        } else {
            var itemName = itemDesc.match(/(\S+?)(?=[,， ])/)[0]
        }

        // 定义一个对象,用来接收每个商品的信息
        var itemObj = {
            itemDesc: itemDesc,
            itemImg: itemImg,
            itemName: itemName,
            itemNumber: itemNumber,
            itemPrice: itemPrice,
            checkNow: checkNow
        }

        // 将对象拼接成数组
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

    // 执行封装的函数,将页面内容及localStorage的值进行更新
    freashItemList()
}



// 设置选择框,全选的效果
$('.orderForms').delegate(".selectAllItem", "click", function() {
    var checkBool = $(this).prop('checked')
    $('.selectAllItem').each(function() {
        $(this).prop('checked', checkBool)
    })
    $('.selector').prop('checked', checkBool)
    cartPageNum()
})

// 点击减号,则减一
$('.J_itemContent').delegate(".reduce", "click", function() {
    var thisItemNum = +$(this).next().val()
    if (thisItemNum > 1) {
        $(this).next().val(--thisItemNum)
    }
    refreash()
    cartPageNum()
})

// 点击加号,则加一
$('.J_itemContent').delegate(".add", "click", function() {
    var thisItemNum = +$(this).prev().val()
    $(this).prev().val(++thisItemNum)
    console.log(memberMsg)
    refreash()
    cartPageNum()
})

// 删除选中商品
$('.deleteSelected').click(function(e) {
    if (!confirm('确定删除选中商品吗?')) {
        return
    }
    for (var i in $('.formsContent')) {
        if ($('.formsContent').eq(i).find('.selector').is(':checked')) {
            $('.formsContent').eq(i).remove()
        }
    }
    refreash()
    cartPageNum()
})

// 删除单个商品
$('.J_itemContent').delegate(".deleteThisItem", "click", function() {
    if (!confirm('确定删除此商品?')) {
        return
    }
    $(this).parent().parent().remove()
    refreash()
    cartPageNum()
})

// 使用多选框选中商品时,相应的下面的值也要改变
$('.J_itemContent').delegate(".selector", "click", function() {
    if ($(this).prop('checked')) {
        cartPageNum()
    }
    refreash()
})

// 不允许页面的购物车数值为非数字,如果输入非数字字符,则自动转为1
$('.J_itemContent').delegate('.J_itemShopCartNumber', 'keyup', function() {
    var val = $(this).val()
    if (/\D/.test(val)) {
        $(this).val(1)
    }
    refreash()
})

// 整体页面效果改变的封装
function cartPageNum() {
    var selectNum = 0,
        totalPrice = 0;
    for (var i = 0; i < $('.formsContent').length; i++) {
        if ($('.formsContent').eq(i).find('.selector').is(':checked')) {
            // 如果多选框被选中,则selectNum加一
            selectNum++
            // 总价是所有的选中元素的价格和的相加
            totalPrice += parseFloat($('.formsContent').eq(i).find('.countPrice').text().match(/\d[\d.]+$/)[0])
        }
    }
    $('.selectedTotalNum').text(selectNum)
    $('.totalCountPrice').html('&yen; : ' + totalPrice.toFixed(2))

    // 通过插件刷新页面的购物车商品数量
    $(window).pub({
        shopCarNum: $('.formsContent').length // 提供购物车的数量
    })
}


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

    // 定义一个对象,存储相应的值
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
        shopCartNum = memberMsg.itemMsg.length

        // 使用插件更新页面的显示数量,将更新的商品数量增加到页面中
        $(window).pub({
            shopCarNum: shopCartNum // 提供购物车的数量
        })
        memberStr = JSON.stringify(memberMsg)
        console.log(memberStr)
            // 更新localStorage
        localStorage.setItem('username', memberStr)
        console.log(localStorage.getItem(memberMsg))
    } catch (e) {}

    // 这里不需要读取出购物车列表的值,所以直接将json值渲染到页面即可
    freashItemList()
})
console.log(memberMsg == null)
    // 为去结算区域添加相应的效果: 若金额非零,则跳转到结算页面
$('.J_goPay').click(function() {
    var totalCountPrice = parseFloat($('.totalCountPrice').text().match(/[\d.]+/)[0])
    if (memberMsg == null) {
        alert('请先登录再结算!')
        window.open('login.html')
        return false;
    }
    if (totalCountPrice == 0) {
        alert('请选中商品再结算')
        return false;
    }



    memberMsg.sendAddress = $('#address').val()
        // console.log($('#address').val())
        // json转字符串
    memberStr = JSON.stringify(memberMsg)

    // 更新localStorage
    localStorage.setItem('username', memberStr)
})