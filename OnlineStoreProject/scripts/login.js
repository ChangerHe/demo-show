$('.qr').hover(function() {
    $(this).stop(true, false).animate({
        left: '0px'
    }, 200, function() {
        $('.scan').stop(true, false).animate({
            right: '0px',
            opacity: 1
        })
    })

}, function() {
    $('.scan').stop(true, true).animate({
        right: '-20px',
        opacity: 0
    }, 200, function() {
        $('.qr').stop(true, true).animate({
            left: '68px'
        })
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