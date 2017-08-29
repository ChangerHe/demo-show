$('#item >li').hover(function() {
    $(this).addClass('hoverLi')
    console.log($(this).find('.content').show())
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

$(window).pub({
    searchItem: '想啥就啥', // 提供搜索栏的默认显示值
    shopCarNum: 5 // 提供购物车的数量
})



// $('.eBooks .headTitle span').mouseover(function() {
//     $('.eBooks .headTitle span').removeClass('active')
//     for (var i = 0; i < $('.eBook .headTitle span').length; i++) {
//         $('.eBooks .headTitle span').eq(i).attr('index', i)
//     }
//     $(this).addClass('active')
//     $('.eBooks .btnContent').hide();
//     $('.eBooks .btnContent').eq($(this).attr('index')).show()
// })

// 添加相应的hover效果
function hoverAnimate(fatherTag) {
    console.log(1)
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