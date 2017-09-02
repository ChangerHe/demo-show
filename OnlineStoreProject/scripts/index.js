try {
    // 解析localStorage的字符串
    var memberMsg = JSON.parse(localStorage.getItem('username'))
        // 将取到的值进行定义,方便后面进行校验
    var username = memberMsg.username
    var password = memberMsg.password
    var shopCartNum = memberMsg.itemMsg.length - 1
} catch (e) {}
// 如果页面存在了localStorage,则欢迎页面直接显示会员的名称
if (!!username) {
    $('.memberInfo').html('<a href="memberCenter.html">' + username + '</a>')
} else {
    $('.memberInfo').html('请&nbsp;<a href="login.html">登陆</a>/<a href="register.html">注册</a>')
}

$(window).pub({
    searchItem: '想啥就啥', // 提供搜索栏的默认显示值
    // 如果shopCartNum为空,这里不会抛错,所以不用捕捉
    shopCarNum: shopCartNum, // 提供购物车的数量
})







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