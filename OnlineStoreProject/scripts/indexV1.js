// 为item的li来添加相应的index,从而实现匹配
for (var i = 0; i < $('#item li').length; i++) {
    $('#item li').eq(i).attr('index', i)
    console.log(i)
}
$('#item li').hover(function() {
    $(this).addClass('hoverLi')
    var index = $(this).attr('index')
    $('.content').eq(index).show()
}, function() {
    $(this).removeClass('hoverLi')
    var index = $(this).attr('index')
    $('.content').eq(index).hide()
})
$('.content').hover(function() {
    $(this).css('display', 'block')
    for (i = 0; i < $('.content').length; i++) {
        if ($('.content')[i] == $(this)[0]) {
            $('#item li').eq(i).addClass('hoverLi')
        }
    }
}, function() {
    $(this).css('display', 'none')
    $('#item li').removeClass('hoverLi')
})

// banner area