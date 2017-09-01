$(window).pub({
    searchItem: '想啥就啥', // 提供搜索栏的默认显示值
    shopCarNum: 5, // 提供购物车的数量
    evaluateNum: 100, // 总的评价数
    evaluateNumGood: 80, // 好评数量
    evaluateNumBetwween: 10, // 中评数量
    evaluateNumBad: 10 // 差评数量
})

// 滚动到对应位置数字跳动的效果

var isExecute = 0
$(window).scroll(function() {
    // 将window的scroll值存储为变量
    var scrollVal = $(this).scrollTop()
    console.log(scrollVal)
        // 监控楼层的距离
    var goodRankNum = parseInt($('.chartCon .goodRank').html())
    if (scrollVal >= 700 && scrollVal <= 800) {
        isExecute++
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
            // 将计算出的好评的长度转为滚动条的长度
        $('.evaluateChart .rankGood ').animate({
                width: width1
            }, 500)
            // 将计算出的中评的长度转为滚动条的长度
        $('.evaluateChart .rankBetween ').animate({
                width: width2
            }, 500)
            // 将计算出的差评的长度转为滚动条的长度
        $('.evaluateChart .rankBad ').animate({
            width: width3
        }, 500)
        var a = 0
        var timer
        timer = setInterval(function() {
            if (a <= goodRankNum) {
                $('.evaluateRank .goodRank ').html(a++ + '%')
            } else {
                clearInterval(timer)
            }
        }, 10)
    }
})
if (isExecute == 1) {
    console.log(1)
    $(window).off('scroll')
}