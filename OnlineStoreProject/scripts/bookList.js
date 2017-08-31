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
// $("#slideBooks").tyslide({
//     boxh: 500, //盒子的高度
//     w: 1200, //盒子的宽度
//     h: 480, //图片的高度
//     isShow: true, //是否显示控制器
//     isShowBtn: true, //是否显示左右按钮
//     controltop: 10, //控制按钮上下偏移的位置,要将按钮向下移动   首先保证boxh 高度>图片 h
//     controlsW: 16, //控制按钮宽度
//     controlsH: 16, //控制按钮高度
//     radius: 8, //控制按钮圆角度数
//     controlsColor: "#d8d8d8", //普通控制按钮的颜色
//     controlsCurrentColor: "#ff6600", //当前控制按钮的颜色
//     isShowNumber: true,
//     marginNum: 2
// });