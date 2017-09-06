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
        console.log(1)
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

// 懒加载
// $("img").lazyload({ effect:   "fadeIn" });





// 整个页面的第二个轮播图,也就是最小到的那个轮播图的效果
$("#sevenCountBanner,#sevenCountBanner1,#sevenCountBanner2").tyslide({
    boxh: 216, //盒子的高度
    w: 330, //盒子的宽度
    h: 216, //图片的高度
    isShow: true, //是否显示控制器
    isShowBtn: true, //是否显示左右按钮
    controltop: 10, //控制按钮上下偏移的位置,要将按钮向下移动   首先保证boxh 高度>图片 h
    controlsW: 14, //控制按钮宽度
    controlsH: 2, //控制按钮高度
    radius: 0, //控制按钮圆角度数
    controlsColor: "#fff", //普通控制按钮的颜色
    controlsCurrentColor: "#7f7f7f", //当前控制按钮的颜色
    isShowNumber: false,
    marginNum: 6
});

// 下方的三个轮播图的效果
$("#ruibikaSell,#outDoorBanner,#childrensBanner").tyslide({
    boxh: 338, //盒子的高度
    w: 426, //盒子的宽度
    h: 338, //图片的高度
    isShow: true, //是否显示控制器
    isShowBtn: true, //是否显示左右按钮
    controltop: 10, //控制按钮上下偏移的位置,要将按钮向下移动   首先保证boxh 高度>图片 h
    controlsW: 14, //控制按钮宽度
    controlsH: 2, //控制按钮高度
    radius: 0, //控制按钮圆角度数
    controlsColor: "#fff", //普通控制按钮的颜色
    controlsCurrentColor: "#7f7f7f", //当前控制按钮的颜色
    isShowNumber: false,
    marginNum: 6
});



// 添加相应的hover效果,为标题右边的三栏菜单
function hoverAnimate(fatherTag) {
    $(fatherTag + ' .headTitle span').mouseover(function() {
        $(fatherTag + ' .headTitle span').removeClass('active')
        for (var i = 0; i < $('.eBook .headTitle span').length; i++) {
            $(fatherTag + ' .headTitle span').eq(i).attr('index', i)
        }
        $(this).addClass('active')
        $(fatherTag + ' .btnContent').hide();
        $(fatherTag + ' .btnContent').eq($(this).attr('index')).show()
    })
}
hoverAnimate('.eBooks')
hoverAnimate('.clothes')
hoverAnimate('.outDoors')
hoverAnimate('.childClothes')

// 为奶嘴部分单独写的效果,并使其自执行
;

! function(fatherTag) {
    $(fatherTag + ' .headTitle span').mouseover(function() {
        $(fatherTag + ' .headTitle span').removeClass('active')
        for (var i = 0; i < $('.eBook .headTitle span').length; i++) {
            $(fatherTag + ' .headTitle span').eq(i).attr('index', i)
        }
        $(this).addClass('active')
        $(fatherTag + ' .btnContent').stop(true, false).fadeOut(200);
        $(fatherTag + ' .btnContent').eq($(this).attr('index')).stop(true, true).fadeIn(200)
    })
}('.popularize')

// 定义左侧的楼梯及楼层滚动特效-----------------------
// 对两边的侧栏进行滚动的判定
$(window).on('scroll', function() {
        var a = $(this).scrollTop()
        if (a >= 600) {
            $('.searchFxedBar').slideDown('slow')
            $('.leftFloor').show()
        } else {
            $('.searchFxedBar').slideUp('slow')
            $('.leftFloor').hide()
        }
    })
    // 左侧的楼层滚动效果
    // 定义一个数组,存储颜色的字符串值
var colorArr = ['#93d470', '#f75727', '#ba9ded', '#ff7495', '#c3ec52', '#ff6600', '#5637f5', '#616161']
    // 为每个li增加鼠标悬停效果
$('.leftFloor li').hover(function() {
    var index = $(this).index()
        // 将样式存为json
    var styleJSON = {
            'backgroundColor': colorArr[index],
            'backgroundPositionX': '-40px'
        }
        // 修改其本身的样式
    $(this).css(styleJSON)
        // 修改雪碧图的背景图片
    $(this).find('span').css({
            'backgroundColor': colorArr[index],
            'backgroundPositionX': '-40px'
        })
        // 将文字显示出来
    $(this).find('p').css('display', 'block')
        // 将宽度设置动画效果
    $(this).stop(true, false).animate({
        width: '80px'
    }, 200)
}, function() {
    var styleJSON = {
        'backgroundColor': '#f2f2f2',
        'backgroundPositionX': '0px'
    }
    $(this).css(styleJSON)
    $(this).find('span').css(styleJSON)
    $(this).find('p').css('display', 'none')
    $(this).stop(true, true).animate({
        width: '40px'
    }, 200)
})

// 为楼层的楼梯添加点击事件
$('.leftFloor li').click(function() {
    var thisIndex = $(this).index()
        // 如果是最后一层楼梯,那么直接滚动到顶部,并返回,防止后面报错
    if (thisIndex == $('.leftFloor li').length - 1) {
        $('html, body').animate({
            scrollTop: 0
        }, 500)
        return
    }
    // 不是最后一个楼梯,则执行滚动到相应的楼层的效果
    var floorPos = $('.floor').eq(thisIndex).offset().top
    $('html, body').animate({
        scrollTop: floorPos
    }, 500)
})