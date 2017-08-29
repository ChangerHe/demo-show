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
    paddingNum: 6
});

$("#sevenCountBanner").tyslide({
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
    paddingNum: 6
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
    paddingNum: 6
});

$(window).pub({
    searchItem: '想啥就啥',
    shopCarNum: 6
})