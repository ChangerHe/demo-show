// 设置鼠标移入二维码时将二维码移动到左侧,手机的图片显示的效果
$('.qr').hover(function() {
    $(this).stop(true, false).animate({
        left: '0px'
    }).next().stop(true, false).delay(400).animate({

        opacity: 1
    })

}, function() {
    $('.scan').stop(true, false).animate({

        opacity: 0
    }).prev().stop(true, false).delay(400).animate({
        left: '68px'
    })

})


// 点击上方文字,切换到对应的登陆方式
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


// 当键盘抬起时,校验输入框内是否有值
$('.id').keyup(function() {
    if ($(this).val()) {
        $('.clearText').show()
    } else {
        $('.clearText').hide()
    }
})

// 点击右侧的叉叉,就删除行内的字符
$('.clearText').click(function() {
    $('.id').val('')
    $('.clearText').hide()
})


try {
    // 解析localStorage的值
    var memberMsg = JSON.parse(localStorage.getItem('username'))
        // 将取到的值进行定义,方便后面进行校验
    var username = memberMsg.username
    var password = memberMsg.password
        // 设置id输入框的默认值为username
    $('.id').val(username)

    $('#submitLogin').click(function(e) {
        if ($('.id').val() != username || $('.password').val() != password) {
            $('.id,.password').css('border', '1px solid red')
            e.preventDefault();
            return false;
        }
        alert('登陆成功')
    })
} catch (e) {}