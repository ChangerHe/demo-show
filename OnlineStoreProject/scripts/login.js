// 设置鼠标移入二维码时将二维码移动到左侧,手机的图片显示的效果
$('.qr').hover(function() {
    $(this).stop(true, false).animate({
        left: '0px'
    }).next().stop(true, false).delay(400).animate({
        right: '0px',
        opacity: 1
    })

}, function() {
    $('.scan').stop(true, true).animate({
        right: '-20px',
        opacity: 0
    }).prev().stop(true, true).delay(400).animate({
        left: '68px'
    })

})

$('.qrLogin').click(function() {
    if ($(this).hasClass('active')) {
        return;
    }
    $('.countLogin').removeClass('active')
    $(this).addClass('active')
    $('.loginCount').hide()
    $('.loginQRBlock').show()
})

$('.countLogin').click(function() {
    if ($(this).hasClass('active')) {
        return;
    }
    $('.qrLogin').removeClass('active')
    $(this).addClass('active')
    $('.loginCount').show()
    $('.loginQRBlock').hide()
})

$('.id').keyup(function() {
    if ($(this).val()) {
        $('.clearText').show()
    } else {
        $('.clearText').hide()
    }
})

$('.clearText').click(function() {
    $('.id').val('')
    $('.clearText').hide()
})