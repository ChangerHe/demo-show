    (function($) {
        $.fn.extend({
            tyslide: function(opts) {
                var defaults = {
                    boxh: 300, //轮播的高度
                    w: 700, //图片宽度
                    h: 300, //图片高度
                    isShow: true, //是否显示控制按钮
                    isShowBtn: true, //是否显示左右按钮
                    controltop: 10, //控制器按钮上下偏移距离 
                    controlsW: 60, //控制按钮宽度
                    controlsH: 6, //控制按钮高度
                    radius: 0, //圆角度数
                    controlsColor: "#ff6600", //普通控制按钮的颜色
                    controlsCurrentColor: "#00ff00", //当前控制按钮的颜色
                    isShowNumber: true,
                    marginNum: 6
                };

                var prams = $.extend({}, defaults, opts); //用opts里面的属性去覆盖defaults里面的属性，最后放到空对象{}里面，prams就是合并之后的对象

                $(this).each(function(index, item) { //此处循环是因为选择器可能选择了页面上多个轮播
                    //item代表当前这个轮播的盒子 
                    var boxwidth = prams.w; //视窗盒子的宽度
                    var boxheight = prams.h; //视窗盒子的高度
                    var isShowNumber = prams.isShowNumber; //是否显示数字
                    var marginNum = prams.marginNum
                    var boxsount = $(item).find(".innerwrapper>li").length; //获取li的个数，是在拷贝节点之前获取的


                    $(item).css({ "width": boxwidth, "height": prams.boxh }); //修改轮播最外层盒子的宽度和高度
                    $(item).find(".innerwrapper").css({ "left": -boxwidth, "height": boxheight }); //修改innerwrapper初始位置的坐标
                    $(item).find(".innerwrapper>li").css({ "width": boxwidth, "height": boxheight, "padding": "0", "display": "block" }); //修改li的宽度和高度
                    $(item).find("img").css({ "width": boxwidth, "height": boxheight }); //修改图片的宽度和高度

                    $(item).find(".btnleft").css({ "opacity": "0.1" }); //设置按钮的透明度
                    $(item).find(".btnright").css({ "opacity": "0.1" }); //设置按钮的透明度

                    var btntop = (boxheight - 50) / 2;
                    $(item).find(".btnleft").css({ "top": btntop });
                    $(item).find(".btnright").css({ "top": btntop });

                    var w1 = (boxsount + 2) * boxwidth; //此宽度是innerwrapper的宽度
                    $(item).find(".innerwrapper").css({ "width": w1 + "px" });

                    var w2 = boxsount * (prams.controlsW + marginNum * 2); //此宽度是controls的宽度
                    var left2 = ((boxwidth - w2) / 2); //计算的控制按钮的x坐标
                    $(item).find(".controls").css({ "width": w2 + "px", "position": "absolute", "height": prams.controlsH, "left": left2, "bottom": prams.controltop, "background-color": "transparent" });

                    if (isShowNumber) {
                        $(item).find(".controls>li").css({ "width": prams.controlsW, "height": prams.controlsH, "border-radius": prams.radius, "margin": "0 " + marginNum + "px", "padding": "0", "display": "block", "border": "0" });
                    } else {
                        $(item).find(".controls>li").text("").css({ "width": prams.controlsW, "height": prams.controlsH, "border-radius": prams.radius, "margin": "0 " + marginNum + "px", "padding": "0", "display": "block", "border": "0" });
                    }

                    //默认设置控制按钮的颜色
                    $(item).find(".controls>li").css({ "background-color": prams.controlsColor });
                    //默认对第一个设置为当前按钮的颜色
                    $(item).find(".controls>li").eq(0).css({ "background-color": prams.controlsCurrentColor });

                    var lifirst = $(item).find(".innerwrapper>li:first").clone(); //克隆第一个li
                    var lilast = $(item).find(".innerwrapper>li:last").clone(); //克隆最后一个li
                    lifirst.appendTo($(item).find(".innerwrapper"));
                    lilast.prependTo($(item).find(".innerwrapper"));
                    var k = 1; //表示当前显示的盒子的索引

                    function playppt() {
                        if (k > boxsount + 1) {
                            k = 1;
                        }

                        if (k < 0) {
                            k = boxsount;
                        }

                        var leftx = -k * boxwidth; //计算坐标 
                        //console.log(k,leftx);
                        var indextemp = k - 1;
                        if (k == (boxsount + 1)) //因为装图片的盒子有6个，控制器的盒子只有4个，当大盒子索引为5的时候  控制器的索引改为0
                        {
                            indextemp = 0;
                        }
                        $(item).find(".controls>li").removeClass("current").eq(indextemp).addClass("current");
                        $(item).find(".controls>li").css({ "background-color": prams.controlsColor }).eq(indextemp).css({ "background-color": prams.controlsCurrentColor });

                        $(item).find(".innerwrapper").animate({ "left": leftx }, function() {
                            //回调函数：动画执行完毕之后执行此处的逻辑代码
                            if (leftx == -boxwidth * (boxsount + 1)) {
                                $(item).find(".innerwrapper").css({ "left": -boxwidth + "px" }); //将第二个盒子（索引=1）移动到当前的视窗里
                                k = 1; //设置了盒子的位置之后，盒子的索引也要相应的改变
                                //console.log("执行完毕");
                            }
                            if (leftx == 0) {
                                var posx = -boxwidth * boxsount;
                                $(item).find(".innerwrapper").css({ "left": posx + "px" }); //将第5个盒子设置到当前的视窗
                                //console.log("执行完毕");
                                k = boxsount; //改变盒子的索引为boxsount
                            }
                        });
                    }

                    var timer = setInterval(function() {
                        ++k;
                        playppt();
                    }, 3000);

                    //注意：此处不能用mouseover和mouseout去做鼠标移动上去和移动开的效果，因为此事件要冒泡。
                    $(item).hover(function() {
                        clearInterval(timer); //鼠标移动到pptbox盒子上面的时候，清理掉定时器，轮播不再切换
                    }, function() {
                        timer = setInterval(function() { //此处的timer前面就不要去加var了，因为前面已经定义了，再加就重复定义了，就会清理不到
                            ++k;
                            playppt(); //鼠标移动开pptbox盒子盒子的时候，从新开始调用定时器 
                        }, 3000);
                    });


                    $(item).find(".btnright").click(function(e) {
                        if (!$(item).find(".innerwrapper").is(":animated")) {
                            ++k;
                            playppt();
                        }
                        e.stopPropagation();
                        e.preventDefault();
                        return false;
                    });

                    $(item).find(".btnleft").click(function(e) {
                        if (!$(item).find(".innerwrapper").is(":animated")) {
                            --k;
                            playppt();
                        }
                        e.stopPropagation();
                        e.preventDefault();
                        return false;
                    });

                    $(item).find(".controls>li").click(function(e) {
                        //点击一个控制按的时候，给他加上当前的样式，把他的同辈的当前样式移除
                        $(this).addClass("current").siblings().removeClass("current");
                        var index = $(item).find(".controls>li").index(this);
                        k = index + 1;
                        playppt();
                        e.stopPropagation();
                        e.preventDefault();
                        return false;
                    });



                    if (prams.isShow) {
                        $(item).find(".controls").show();
                    } else {
                        $(item).find(".controls").hide();
                    }

                    if (prams.isShowBtn) {
                        $(item).find(".btnleft").show();
                        $(item).find(".btnright").show();
                    } else {
                        $(item).find(".btnleft").hide();
                        $(item).find(".btnright").hide();
                    }

                    $(item).mouseenter(function() {
                        if (prams.isShowBtn) {
                            $(item).find(".btnleft").css({ "opacity": "0.6" });
                            $(item).find(".btnright").css({ "opacity": "0.6" });
                        }
                    });

                    $(item).mouseleave(function() {
                        if (prams.isShowBtn) {
                            $(item).find(".btnleft").css({ "opacity": "0.1" });
                            $(item).find(".btnright").css({ "opacity": "0.1" });
                        }
                    });


                })
            }
        });
    })(jQuery)