/**
 * @name: index
 * @author: ChangerHe
 * @description: 
 *      设置在线客服的相关功能,
 *      设置li点击之后变色,
 *      下方图片及文字联动效果,
 *      实现banner轮播效果，
 *      正则表达式的表单验证
 * @update: 2017-08-02
 */

window.onload = function() {
    var bannerCon = document.getElementById('bannerCon');
    var banner = bannerCon.getElementsByTagName('div');
    var btnL = document.getElementById('btnL');
    var btnR = document.getElementById('btnR');
    var head = document.getElementById("head");
    var aLi = head.getElementsByTagName("li");
    var aContent = document.querySelectorAll(".content");
    var show = document.getElementById("show");
    var onlineService = document.getElementById("onlineService");
    var hoverAfter = document.getElementById("hoverAfter");
    
    var text = document.getElementById("text");
    var form = document.getElementById("form");
    /**
     * 设置在线客服的相关功能
     * 1、鼠标移入前是缩略状态，移入后形成现有状态
     * 2、设置向上箭头点击跳转的动画效果
     * 3、设置向上箭头在页面在最顶部时隐藏
     */ 
    onlineService.onmouseover = function() {
        text.style.display = "none";
        hoverAfter.style.display = "block";
        var count = setInterval(function() {
            if (hoverAfter.style.display == "block" && (parseInt(onlineService.style.right)) < 0) {
                onlineService.style.right = parseInt(onlineService.style.right) + 1 + "px";
            console.log(1)} 
        },20)
    }
    
    if ((parseInt(onlineService.style.right)) == 0) {
        clearInterval(count)
    }

    // 设置li点击之后变色,下方图片及文字联动效果
    for(var i = 0; i < aLi.length; i++) {
        aLi[i].setAttribute("name",i)
        
        aLi[i].onclick = function() {
            var name = this.getAttribute("name");
            for(var j = 0; j < aLi.length; j++) {
                aLi[j].className = "";
            }
            this.className = "active";
            for(j = 0; j < aContent.length; j++) {
                aContent[j].id = "";
                
            }
            aContent[name].id = "show";
        }
    }
    
    // 实现banner轮播效果
    function animate(offset) {
        bannerCon.style.left = parseInt(bannerCon.style.left) + offset + "px";
        if( parseInt(bannerCon.style.left) < -945 ) {
            bannerCon.style.left = "0px";
        } else if ( parseInt(bannerCon.style.left) > 0 ) {
            bannerCon.style.left = "-945px";
        }
    }

    btnL.onclick = function() {
        animate(-315)
    }
    btnR.onclick = function() {
        animate(315)
    }


    // 实现不点击时，自动播放效果
    //waiting for fix ! double click problem
    setInterval(function() {
        animate(-315)
    },4000)

    // 正则表达式的表单验证

}