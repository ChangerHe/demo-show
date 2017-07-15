$("document").ready(function(){
    var n=0;
    // 实现顶部导航栏鼠标移入显示的效果-已完成
    $(".nav-left-more").mouseover(function(){
        $(".toggle-area").show()
    })
    $(".nav-left-more").mouseout(function(){
        $(".toggle-area").hide()
    })
    // 实现淘宝广告下部九个链接块自动播放效果-已完成
    setInterval(function(){
        $(".autoplay a").removeClass("active");
        $(".autoplay a").eq(n).addClass("active");
        if(n == 8){
            n = 0;
        } else {
            n++;
        }
    },1000)
    // 实现淘宝上部图片自动播放联动效果-未完成
    // 实现鼠标移入小图片，自动联动到该大图效果-未完成
    // 实现点击左右小箭头，图片联动跳转效果-未完成
    for(var i = 0; i < $(".imgchoose img").length; i++ ){
        var j = i;
        $(".imgchoose img").eq(j).mouseover(function(){
            $(".taobaoad .imgs").eq(j).removeClass("hide")
            // $(".taobaoad .imgs:lt(j-1)").addClass("hide")
            // $(".taobaoad .imgs:gt(j+1)").addClass("hide")
        })

    }
    // 实现右下角向上箭头下滑页面时显示效果-未完成
    console.log($(window).scrollTop())
    if(!$(window).scrollTop()) {
        $(".clickup").hide();
    }






})

