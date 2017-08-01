window.onload = function() {
    var bannerCon = document.getElementById('bannerCon');
    var banner = bannerCon.getElementsByTagName('div');
    var btnL = document.getElementById('btnL');
    var btnR = document.getElementById('btnR');
    var head = document.getElementById("head");
    var aLi = head.getElementsByTagName("li");
    var aContent = document.querySelectorAll(".content");
    var show = document.getElementById("show");
    // 设置li点击之后变色
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
    // 下方图片及文字联动效果


    // 实现banner轮播效果
    function animate(offset) {
        // for( var i = 0; i < banner.length; i++) {
        //     banner[i].setAttribute('style', "transform: left 2s;")
        // }
        // bannerCon.setAttribute('style', "transition: left 2s;")
        bannerCon.style.left = parseInt(bannerCon.style.left) + offset + "px";
        if( parseInt(bannerCon.style.left) < -945 ) {
            bannerCon.style.left = "0px";
        } else if ( parseInt(bannerCon.style.left) > 0 ) {
            bannerCon.style.left = "-945px";
        }
            // bannerCon.style.transition = "left 2s";
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
}