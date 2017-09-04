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
$('.J_product').click(function(e) {
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
    var itemPrice = ($(this).find('.J_price').html()).match(/\d[\d.]+$/)[0]
        // 如果页面中没有商品的名称,则使用形容的第一句话作为商品名称
        // 因为子元素中没有name的时候,还是会返回一个对象,所以在find后面加上索引,以便找到匹配的值
    if ($(this).find('.J_name')[0]) {
        var itemName = $(this).find('.J_name').html()
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




// 对热卖畅销区域的下方书籍给予样式的初始化
$('.hotBooksRecommend').eq(1).css('top', '112px')
for (var i = 2; i < $('.hotBooksRecommend').length; i++) {
    $('.hotBooksRecommend').eq(i).css('top', (i - 1) * 43 + 113 + 'px')
}

// 为热卖畅销区域的样式设置移入移出效果
$('.hotBooksRecommend').hover(function() {
    // 将样式先进行重置
    for (var i = 0; i < $('.hotBooksRecommend').length; i++) {
        $('.hotBooksRecommend').eq(i).css('top', i * 43 + 'px')
    }
    // 然后.将移入的样式的下一个样式整体往下移69个像素
    $(this).nextAll().each(function() {
            var top = parseInt($(this).css('top')) + 69 + 'px';
            $(this).css('top', top)
        })
        // 调整相应的图片的高度
    $(this).find('img').css('marginTop', '16px')
}, function() {
    // 将所有书籍复原为之前的样子
    $('.hotBooksRecommend').eq(1).css('top', '112px')
    for (var i = 2; i < $('.hotBooksRecommend').length; i++) {
        $('.hotBooksRecommend').eq(i).css('top', (i - 1) * 43 + 112 + 'px')
    }
    // 恢复之前的图片状态
    $(this).find('img').css('marginTop', '5px')
})

// 下方整体图书的轮播效果-----------------
// 克隆第一个和最后一个,并将其分别插入到最后一个之后和第一个之前
var clone1 = $('.booksBannerWrapper').find('.content:first').clone()
var clone2 = $('.booksBannerWrapper').find('.content:last').clone()
$('.booksBannerWrapper').find('.content:last').after(clone1)
$('.booksBannerWrapper').find('.content:first').before(clone2)
var index = 0;
// 初始化左侧值,将第一个先显示在上面
$('.booksBannerWrapper').css('left', '-1200px')
    // 定义一个index值,方便进行联动操作
index = 1
    // 定义一个box方便引用
var box = $('.booksBannerWrapper')
    // 定义移动的animate
var move = function() {
        box.animate({
            'left': -1200 * index + 'px'
        }, 500, function() {
            if (index >= 8) {
                index = 1
                box.css('left', '-1200px')
            } else if (index <= 0) {
                index = 7
                box.css('left', -1200 * index + 'px')
            }
        })
    }
    // 其他地方的联动效果
var line = function() {
        $('.bottomDot span').removeClass('active')
        $('.personalPro .personalProvide span').removeClass('active')
        $('.bottomDot span').eq(index - 1).addClass('active')
        $('.personalPro .personalProvide span').eq(index - 1).addClass('active')
        if (index >= 8) {
            $('.bottomDot span').eq(0).addClass('active')
            $('.personalPro .personalProvide span').eq(0).addClass('active')
        }
    }
    // 左侧的点击效果
$('.leftArr').click(function() {
        if (!box.is(':animated')) {
            index--
            line()
            move()
        }
    })
    // 右侧的点击效果
$('.rightArr').on('click', function() {
        if (!box.is(':animated')) {
            index++
            line()
            move()
        }
    })
    // 上方文字的点击移动效果
$('.personalProvide span').on('mouseover', function() {
        var thisIndex = $(this).index()
        index = thisIndex + 1
            // line()
            // move()
        $('.personalProvide span').removeClass('active')
        $(this).addClass('active')
        box.stop(true, false).fadeOut(200)
        box.css('left', -1200 * index + 'px')
        box.stop(true, true).fadeIn(200)
        line()
    })
    // 下方点点的点击切换效果
$('.bottomDot span').on('click', function() {
    var thisIndex = $(this).index()
    index = thisIndex + 1
    line()
    move()
})

// 设置轮播自动播放的定时器
var timer = setInterval(function() {
    index++
    move()
    line()
}, 3000)

// 鼠标移入时,将定时器取消,移除再开始
$('.personalPro').hover(function() {
    clearInterval(timer)
}, function() {
    timer = setInterval(function() {
        index++
        move()
        line()
    }, 3000)
})

// 换一批的效果
$('.guessYouLike .change').click(function(e) {
    e.preventDefault()
    $('.guessYouLike .content').fadeOut(200)
    $('.guessYouLike .content').fadeIn(200)

})