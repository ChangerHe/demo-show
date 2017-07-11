$("document").ready(function(){
    var n=1;
    $(".nav-left-more").mouseover(function(){
        $(".toggle-area").show()
    })
    $(".nav-left-more").mouseout(function(){
        $(".toggle-area").hide()
    })
    // setInterval(function(){
    //     $(".autoplay a").removeClass("active");
    //     $(".autoplay a:nth-child(n)").addClass("active");
    //     n++;
    // },1000)
    console.log($(".imgchoose img").length)
    for(var i = 0; i < $(".imgchoose img").length; i++ ){
        $(".imgchoose img:nth-child(i+1)").mouseover(function(){
            console.log(1)
        })
    }









})

