// 因为后面的逻辑需要取得相应的code值,所以将code定义到全局变量中
var code = ''

// 页面加载时就要渲染出验证码,所以这里要先执行一次
changCode()


// 校验码点击之后进行更换
$('.letterCode').click(function() {
    changCode()
})

// 定义一个随机改变二维码的函数
function changCode() {
    // 因为下面有concat链接字符串的操作,所以每次调用即清空code
    code = '';
    var code1 = '';
    var num = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var num1 = '0123456789abcdef'
        // 这是随机生成的四个字符,用于显示上面的字母
    for (var i = 0; i < 4; i++) {
        var randomNum = num[Math.floor(Math.random() * 62)]
        code = code.concat(randomNum)
    }
    // 再随机生成相应的颜色值,用于做背景
    for (i = 0; i < 6; i++) {
        var randomNum = num1[Math.floor(Math.random() * 16)]
        code1 = code1.concat(randomNum)
    }
    // 获取canvas 的位置
    var letterCode = document.getElementsByTagName('canvas')[0]
    var context = letterCode.getContext('2d')
        // 填充颜色,先这样填充,后面使用封装的函数进行更改
    context.fillStyle = '#' + code1
        // 填充整个canvas
    context.fillRect(0, 0, 124, 36)
        // 设置字体的样式
    context.font = ' 20px/36px Arial'
    context.textAlign = 'start'
    context.fillStyle = '#0f0'
    context.textBaseline = 'middle'
    context.fillText(code, 40, 20)
}

// 点击获取手机验证码,即开始六十秒倒计时
$('.J_phoneCode').click(function() {
    var time = 60;
    var timer = setInterval(function() {
        if (time == 0) {
            clearInterval(timer)
            $('.J_phoneCode').val('获取验证码')
            $('.J_phoneCode').prop('disabled', false)
            $('.J_phoneCode').css({ 'backgroundColor': '#ff6600', 'color': '#fff' })
            return;
        }
        $('.J_phoneCode').css({ 'backgroundColor': '#e6e6e6', 'color': '#4d4d4d' })
        time--;
        $('.J_phoneCode').val('(' + time + ')秒后重新获取 ')
        $('.J_phoneCode').prop('disabled', true)
    }, 1000)

})

// 信息校验区域-------------------------------------------------
// 因为信息较复杂,所以这里直接放到全局变量,方便进行校验
var username,
    password,
    confPassword,
    phoneNum,
    letterCode,
    phoneCode,
    agree;

// 定义对应的匹配条件
var usernameRE,
    passwordRE,
    confPasswordRE,
    phoneNumRE,
    letterCodeRE,
    agreeRE;


$('#username').blur(function() {
    username = $('#username').val()
    usernameRE = /^\w{5,12}$/.test(username)
    if (!usernameRE) {
        $('#username').parent().find('.info').text('用户名必须为5-12位,由字母数字下划线组成')
    } else {
        $('#username').parent().find('.info').text('')
    }
})

$('#password').blur(function() {
    password = $('#password').val()
    passwordRE = /^\w{5,12}$/.test(password)
    if (!passwordRE) {
        $('#password').parent().find('.info').text('用户名必须为5-12位,由字母数字下划线组成')
    } else {
        $('#password').parent().find('.info').text('')
    }
})

$('#confPassword').blur(function() {
    confPassword = $('#confPassword').val()
    confPasswordRE = confPassword === password ? true : false
    if (!confPasswordRE) {
        $('#confPassword').parent().find('.info').text('必须和之前输入的密码相同')
    } else {
        $('#confPassword').parent().find('.info').text('')
    }
})

$('#phoneNum').blur(function() {
    phoneNum = $('#phoneNum').val()
    phoneNumRE = /^1[34578]\d{9}$/.test(phoneNum)
    if (!phoneNumRE) {
        $('#phoneNum').parent().find('.info').text('手机号码格式不正确')
    } else {
        $('#phoneNum').parent().find('.info').text('')
    }
})

$('#letterCode').blur(function() {
    letterCode = $('#letterCode').val()
    console.log(letterCode)
    letterCodeRE = letterCode === code ? true : false
    if (!letterCodeRE) {
        $('#letterCode').parent().find('.info').text('验证码不正确')
    } else {
        $('#letterCode').parent().find('.info').text('')
    }
})

$('#agree').blur(function() {
    agreeRE = agree = $('#agree').prop('checked')
    if (!agreeRE) {
        $('#agree').parent().find('.info').text('请同意《乐购用户注册协议》')
    } else {
        $('#agree').parent().find('.info').text('')
    }

})

// 点击则进行校验
$('#submitBar').click(function(e) {

    // 如果正确,则进行
    if (usernameRE && passwordRE && confPasswordRE && phoneNumRE && letterCodeRE && agreeRE) {
        var memberMsg = {
            username: username,
            password: password,
            phoneNum: phoneNum,
            itemMsg: [],
            sendAddress: ''
        };
        var jsonObj = JSON.stringify(memberMsg);
        // console.log(username)
        localStorage.setItem('username', jsonObj);
        // console.log(localStorage.getItem('username'));
        alert('注册成功!')
    } else {
        e.preventDefault();
        return false;
    }
})