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
console.log($('.booksBannerWrapper .content:last'))
$('.booksBannerWrapper').find('.content:first').before(clone2)
console.log($('.booksBannerWrapper .content:last'))
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
            index++
            line()
            move()
        }
    })
    // 右侧的点击效果
$('.rightArr').on('click', function() {
        if (!box.is(':animated')) {
            index--
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