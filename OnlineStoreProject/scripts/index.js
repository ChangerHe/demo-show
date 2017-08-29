$('#item >li').hover(function() {
    $(this).addClass('hoverLi')
    $(this).find('.content').show()
}, function() {
    $(this).removeClass('hoverLi')
    $(this).find('.content').hide()
})

$("#slideBoxSmall").tyslide({
    boxh: 430, //盒子的高度
    w: 1000, //盒子的宽度
    h: 400, //图片的高度
    isShow: true, //是否显示控制器
    isShowBtn: true, //是否显示左右按钮
    controltop: 10, //控制按钮上下偏移的位置,要将按钮向下移动   首先保证boxh 高度>图片 h
    controlsW: 16, //控制按钮宽度
    controlsH: 16, //控制按钮高度
    radius: 8, //控制按钮圆角度数
    controlsColor: "#d8d8d8", //普通控制按钮的颜色
    controlsCurrentColor: "#ff6600", //当前控制按钮的颜色
    isShowNumber: true,
    marginNum: 2
});

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


// 为文中的样式及文字提供默认显示效果
$(window).pub({
    searchItem: '想啥就啥', // 提供搜索栏的默认显示值
    shopCarNum: 5 // 提供购物车的数量
})



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
hoverAnimate('.popularize')

// 为新书畅销榜,从你的全世界路过部分,添加相应的hover样式

$('.wellSell').hover(function() {
    // 因为出现了没有固定块的高度而导致每个书籍下方的横线出现变短的情况,因此在这里将每个盒子的高度固定
    $('.wellSell').css('height', '42px')
        // 将所有wellSell中的wellBook类隐藏
    $('.wellSell').find('.wellBook').slideUp('fast')
        // 将所有wellSell中的anitherText类隐藏
    $('.wellSell').find('.anotherText').slideUp('fast')
        // 将当前wellSell中的wellBook类显现
    $(this).find('.wellBook').stop(true, false).slideDown('fast')
        // 将当前wellSell中的anitherText类显现
    $(this).find('.anotherText').stop(true, false).slideDown('fast')
        // 设置当前wellSell的高度
    $(this).css('height', '148px')
}, function() {
    // $(this).find('.wellBook').stop(true, true).slideUp('fast')
    // $(this).find('.anotherText').stop(true, true).slideUp('fast')
    // $(this).css('height', '42px')
})

// 为奶嘴部分添加hover效果

$('.btnContent .item').hover(function() {
    $('.btnContent .item').removeClass('active')
    $(this).addClass('active')
}, function() {
    $('.btnContent .item').removeClass('active')
})

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


// 为左侧楼层增加相应的效果
$('.leftFloor li').hover(function() {
    // 为鼠标移入的span标签添加active
    $(this).addClass('active')
        // 定义一个leftFloorCurr,存储背景定位的X轴位置
    var leftFloorCurr = parseInt($('.leftFloor .active').css('backgroundPositionX'))
        // X轴位置交给本身
    $(this).css('backgroundPositionX', leftFloorCurr - 40 + 'px')
        // 为右侧内容设置滑动上去之后显示的效果
    $(this).stop(true, false).animate({
        width: '80px'
    }, 100)
}, function() {
    //定义一个leftFloorCurr,存储背景定位的X轴位置
    var leftFloorCurr = parseInt($('.leftFloor .active').css('backgroundPositionX'))
        // X轴位置交给本身
    $(this).css('backgroundPositionX', leftFloorCurr + 40 + 'px')
        // 移除身上的active
    $('.leftFloor li').removeClass('active')
        // 为右侧内容设置滑动上去之后隐藏的效果
    $(this).stop(true, true).animate({
        width: '40px'
    }, 100)
})

// 定义楼层的滚动效果
$('.leftFloor li').on('click', function() {
    var a = 1100;
    $('html,body').animate({
        scrollTop: a + $(this).index() * 610
    }, 1000)
})