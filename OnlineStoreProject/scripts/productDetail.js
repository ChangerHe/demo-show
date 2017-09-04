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


// 为商品添加点击后传输数据的效果,并更新到购物车中
$('.J_addToCart').click(function(e) {
    // 捕捉点击的位置,为之后做动画效果做准备
    var top = e.pageY
    var left = e.pageX

    // 找到商品descripe的值
    var itemDesc = $('.J_descripe').html()

    // 找到商品的图片地址
    var itemImg = $('.J_img').prop('src')

    // 先定义商品的数量
    var itemNumber = $('.J_thisItemNum').val()

    // 解析出商品的价格,因为之后还是要直接转为字符,所以这里就先不转为字符串格式
    var itemPrice = ($('.J_price').html()).match(/\d[\d.]+$/)[0]

    // 如果页面中没有商品的名称,则使用形容的第一句话作为商品名称
    // 因为子元素中没有name的时候,还是会返回一个对象,所以在find后面加上索引,以便找到匹配的值
    if ($('.J_name')[0]) {
        var itemName = $('.J_name').html()
    } else {
        var itemName = itemDesc.match(/(\S+?)(?=[,， ])/)[0]
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

        // 更新localStorage
        localStorage.setItem('username', memberStr)
        console.log(localStorage.getItem(memberMsg))
    } catch (e) {}
})


// 为平装版精装版的选择添加点击选中效果
$('.simpleVersion,.delicateVersion').click(function() {
    $(this).addClass('active').siblings().removeClass('active')
})

// 为商品的数量添加点击增加和减少的效果-----------
// 点击减号,则减一
$(".reduce").on("click", function(e) {
    var thisItemNum = +$(this).prev().prev().val()
    if (thisItemNum > 1) {
        $(this).prev().prev().val(--thisItemNum)
    }
    e.preventDefault()
})

// 点击加号,则加一
$(".add").on("click", function(e) {
    var thisItemNum = +$(this).prev().val()
    $(this).prev().val(++thisItemNum)
    e.preventDefault()
})

// 不允许页面的购物车数值为非数字,如果输入非数字字符,则自动转为1
$('.num').on('keyup', function() {
    var val = $(this).val()
    console.log(/\D/.test(val))
    if (/\D/.test(val)) {
        $(this).val(1)
    }
})

// 商品详情和评价页面的切换效果
$('.produceAndEvaluate .headTitle').find('span').click(function() {
    $(this).removeClass('notActive').siblings().addClass('notActive')
    console.log($(this).index())
    $('.evaluateBanner').hide()
    $('.evaluateBanner').eq($(this).index()).show()
})

// 滚动到对应位置数字跳动的效果--------------------
$(window).scroll(function() {
    // 将window的scroll值存储为变量
    var scrollVal = $(this).scrollTop()
        // 监控楼层的距离
    var goodRankNum = parseInt($('.chartCon .goodRank').html())
    if (scrollVal >= 700 && scrollVal <= 800) {

        // 先算出好评的值
        // 计算出评价的百分比,并将值对应到宽度上,刚好数据条的宽度是150,所以这里直接乘1.5
        var width1 = parseInt(goodRankNum * 1.5),
            betweenRankNum = parseInt($('.chartCon .betweenRank').html()),
            // 计算出评价的百分比,并将值对应到宽度上
            width2 = parseInt(betweenRankNum * 1.5),
            badRankNum = parseInt($('.chartCon .badRank').html()),
            // 计算出评价的百分比,并将值对应到宽度上
            width3 = parseInt(badRankNum * 1.5)
        console.log(goodRankNum)

        // 实现滚动条的滚动效果,需要先将滚动条的值设置为0
        $('.evaluateChart .rankGood ').css('width', '0px')
        $('.evaluateChart .rankBetween ').css('width', '0px')
        $('.evaluateChart .rankBad ').css('width', '0px')

        // 将计算出的好评的长度转为滚动条的长度
        $('.evaluateChart .rankGood ').stop(true, false).animate({
                width: width1
            }, 500)
            // 将计算出的中评的长度转为滚动条的长度
        $('.evaluateChart .rankBetween ').stop(true, false).animate({
                width: width2
            }, 500)
            // 将计算出的差评的长度转为滚动条的长度
        $('.evaluateChart .rankBad ').stop(true, false).animate({
            width: width3
        }, 500)
        var a = 0
        var timer
            // 滚动到相应位置启动定时器,产生数字跳动效果
        timer = setInterval(function() {
            if (a <= goodRankNum) {
                $('.evaluateRank .goodRank ').html(a++ + '%')
            } else {
                clearInterval(timer)
            }
        }, 10)
    }
})