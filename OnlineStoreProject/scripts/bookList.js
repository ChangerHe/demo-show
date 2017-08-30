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