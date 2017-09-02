var letterCode = document.getElementsByTagName('canvas')[0]
var context = letterCode.getContext('2d')
    // 填充颜色,先这样填充,后面使用封装的函数进行更改
context.fillStyle = '#00f'
    // 填充整个canvas
context.fillRect(0, 0, 124, 36)
    // 设置字体的样式
context.font = ' 20px/36px Arial'
context.textAlign = 'start'
context.fillStyle = '#0f0'

context.textBaseline = 'middle'
context.fillText('1234', 40, 20)


// webGL并非W3C的标准主要用来参与到canvas的3d图形绘制之中







// // 校验码点击之后进行更换
// $('.letterCode').click(function() {
//     changCode()
// })

// function changCode() {
//     var code = '';
//     var num = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
//         // 这是随机生成的四个字符
//     for (var i = 0; i < 4; i++) {
//         var randomNum = num[Math.floor(Math.random() * 62)]
//         code = code.concat(randomNum)
//     }
//     $('.letterCode').text(code)
// }



// // 点击则进行校验
// $('#submitBar').click(function(e) {
//     var username = $('#username').val(),
//         password = $('#password').val(),
//         confPassword = $('#confPassword').val(),
//         phoneNum = $('#phoneNum').val(),
//         letterCode = $('#letterCode').val(),
//         phoneCode = $('#phoneCode').val(),
//         agree = $('#agree').prop('checked')

//     console.log(agree)















//     e.preventDefault();
//     return false;
// })