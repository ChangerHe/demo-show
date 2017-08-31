/**
 * 这里为为后端提供相应的接口处
 *      .shopCarNum  购物车的数量,此类可直接写在需要写入购物车数量的地方
 *      .searchItem  搜索框的内容区域,一般建议使用form作为标签,以此名称作为类名
 *      
 *      
 */



// 以下是自己封装的插件部分
;
(function($) {
    $.fn.extend({
        pub: function(opts) {
            var defaults = {
                searchItem: '创意文具',
                shopCarNum: 5
            }
            var prams = $.extend({}, defaults, opts);
            var searchText = prams.searchItem;
            var shopCarNum = prams.shopCarNum;
            // 将值先显示到页面上
            $('.shopCarNum input[type=text]').prop('value', searchText)
                // 提供相应的点击隐藏效果
            $('.searchItem input[type=text]').focus(function() {
                if ($(this).prop('value') == searchText) {
                    $(this).prop('value', '')
                }
            })
            $('.searchItem input[type=text]').blur(function() {
                    if ($(this).prop('value') == '') {
                        $(this).prop('value', searchText)
                    }
                })
                // 将json的值解析至屏幕
            $('.shopCarNum').html(shopCarNum)

        }
    })
})(jQuery);


// 为文中的样式及文字提供默认显示效果,对应接上了相应的接口,插件在上面
$(window).pub({
    searchItem: '想啥就啥', // 提供搜索栏的默认显示值
    shopCarNum: 5 // 提供购物车的数量
})

// 设置所有图片进行懒加载
$(function() {
    $("img").lazyload({
        effect: "fadeIn",
        threshold: 0
    });
});

// 为菜单设置点击上啦和下降的效果
$('.allItem').on('click', function(e) {
    e.preventDefault();
    var $item = $('.item')
        // $('.item').slideToggle()
    if ($item.css('display') == 'none') {
        $item.slideDown(400)
        $(this).find('.downArrow').delay(400).css({ 'backgroundPositionX': '-450px', 'backgroundPositionY': '-86px' })
    } else {
        $item.slideUp(400)
        $(this).find('.downArrow').delay(400).css({ 'backgroundPositionX': '-450px', 'backgroundPositionY': '-140px' })
    }
})

// 以下是无延迟高容差的菜单效果的封装代码插件部分
;
(function($) {
    $.fn.menuAim = function(opts) {
        this.each(function() {
            init.call(this, opts);
        });
        return this;
    };

    function init(opts) {
        var $menu = $(this),
            activeRow = null,
            mouseLocs = [],
            lastDelayLoc = null,
            timeoutId = null,
            options = $.extend({
                rowSelector: "> li",
                submenuSelector: "*",
                submenuDirection: "right",
                tolerance: 75,
                enter: $.noop,
                exit: $.noop,
                activate: $.noop,
                deactivate: $.noop,
                exitMenu: $.noop
            }, opts);
        var MOUSE_LOCS_TRACKED = 3,
            DELAY = 300;
        var mousemoveDocument = function(e) {
            mouseLocs.push({ x: e.pageX, y: e.pageY });
            if (mouseLocs.length > MOUSE_LOCS_TRACKED) {
                mouseLocs.shift();
            }
        };
        var mouseleaveMenu = function() {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            if (options.exitMenu(this)) {
                if (activeRow) {
                    options.deactivate(activeRow);
                }
                activeRow = null;
            }
        };
        var mouseenterRow = function() {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                options.enter(this);
                possiblyActivate(this);
            },
            mouseleaveRow = function() {
                options.exit(this);
            };
        var clickRow = function() {
            activate(this);
        };
        var activate = function(row) {
            if (row == activeRow) {
                return;
            }
            if (activeRow) {
                options.deactivate(activeRow);
            }
            options.activate(row);
            activeRow = row;
        };
        var possiblyActivate = function(row) {
            var delay = activationDelay();
            if (delay) {
                timeoutId = setTimeout(function() {
                    possiblyActivate(row);
                }, delay);
            } else {
                activate(row);
            }
        };
        var activationDelay = function() {
            if (!activeRow || !$(activeRow).is(options.submenuSelector)) {
                return 0;
            }
            var offset = $menu.offset(),
                upperLeft = {
                    x: offset.left,
                    y: offset.top - options.tolerance
                },
                upperRight = {
                    x: offset.left + $menu.outerWidth(),
                    y: upperLeft.y
                },
                lowerLeft = {
                    x: offset.left,
                    y: offset.top + $menu.outerHeight() + options.tolerance
                },
                lowerRight = {
                    x: offset.left + $menu.outerWidth(),
                    y: lowerLeft.y
                },
                loc = mouseLocs[mouseLocs.length - 1],
                prevLoc = mouseLocs[0];
            if (!loc) {
                return 0;
            }
            if (!prevLoc) {
                prevLoc = loc;
            }
            if (prevLoc.x < offset.left || prevLoc.x > lowerRight.x ||
                prevLoc.y < offset.top || prevLoc.y > lowerRight.y) {
                return 0;
            }
            if (lastDelayLoc &&
                loc.x == lastDelayLoc.x && loc.y == lastDelayLoc.y) {
                return 0;
            }

            function slope(a, b) {
                return (b.y - a.y) / (b.x - a.x);
            };
            var decreasingCorner = upperRight,
                increasingCorner = lowerRight;
            if (options.submenuDirection == "left") {
                decreasingCorner = lowerLeft;
                increasingCorner = upperLeft;
            } else if (options.submenuDirection == "below") {
                decreasingCorner = lowerRight;
                increasingCorner = lowerLeft;
            } else if (options.submenuDirection == "above") {
                decreasingCorner = upperLeft;
                increasingCorner = upperRight;
            }
            var decreasingSlope = slope(loc, decreasingCorner),
                increasingSlope = slope(loc, increasingCorner),
                prevDecreasingSlope = slope(prevLoc, decreasingCorner),
                prevIncreasingSlope = slope(prevLoc, increasingCorner);
            if (decreasingSlope < prevDecreasingSlope &&
                increasingSlope > prevIncreasingSlope) {
                lastDelayLoc = loc;
                return DELAY;
            }
            lastDelayLoc = null;
            return 0;
        };
        $menu
            .mouseleave(mouseleaveMenu)
            .find(options.rowSelector)
            .mouseenter(mouseenterRow)
            .mouseleave(mouseleaveRow)
            .click(clickRow);
        $(document).mousemove(mousemoveDocument);

    };
})(jQuery);
// 结束,无延迟高容错导航菜单的封装源码,来自jquery-menu-aim

// 实现无延迟高容差的菜单效果-----------------

// 定义激活的li的jQuery效果
function activeAni(tag) {
    $(tag).addClass('hoverLi')
    $(tag).find('.content').show()
}

// 定义移除的li的jQuery效果
function reactiveAni(tag) {
    $(tag).removeClass('hoverLi')
    $(tag).find('.content').hide()
}

// 将方法写入插件,执行
$('#item').menuAim({
    activate: activeAni, // fired on row activation
    deactivate: reactiveAni, // fired on row deactivation
    exitMenu: function() { return true; }
});

// 顶部最大的轮播图效果-----------------
$("#slideBoxSmall").tyslide({
    boxh: 430, //盒子的高度
    w: 1000, //盒子的宽度
    h: 400, //图片的高度
    isShow: true, //是否显示控制器
    isShowBtn: true, //是否显示左右按钮
    controltop: 10, //控制按钮上下偏移的位置,要将按钮向下移动   首先保证boxh 高度>图片 h
    controlsW: 16, //控制按钮宽度
    controlsH: 16, //控制按钮高度
    radius: 8, //控制按钮圆角度数
    controlsColor: "#d8d8d8", //普通控制按钮的颜色
    controlsCurrentColor: "#ff6600", //当前控制按钮的颜色
    isShowNumber: true,
    marginNum: 2
});


// 为新书畅销榜,从你的全世界路过部分,添加相应的hover样式,因为还有一个地方有这个相同的样式,因此也拿到public里面来-------------------

$('.wellSell').hover(function() {
    // 因为出现了没有固定块的高度而导致每个书籍下方的横线出现变短的情况,因此在这里将每个盒子的高度固定
    $('.wellSell').css('height', '42px')
        // 将所有wellSell中的wellBook类隐藏
    $('.wellSell').find('.wellBook').slideUp('fast')
        // 将所有wellSell中的anitherText类隐藏
    $('.wellSell').find('.anotherText').slideUp('fast')
        // 将当前wellSell中的wellBook类显现
    $(this).find('.wellBook').stop(true, false).slideDown('fast')
        // 将当前wellSell中的anitherText类显现
    $(this).find('.anotherText').stop(true, false).slideDown('fast')
        // 设置当前wellSell的高度
    $(this).css('height', '148px')
}, function() {
    // 经测试,使用hover效果,此处不放东西的效果比直接使用mouseover的效果要好,所以这里作为空数组保留
})


// 楼层的效果------------------------------------



// 为左侧楼层增加相应的效果
// $('.leftFloor li').hover(function() {
//     // 为鼠标移入的span标签添加active
//     $(this).addClass('active')
//         // 定义一个leftFloorCurr,存储背景定位的X轴位置
//     var leftFloorCurr = parseInt($('.leftFloor .active').css('backgroundPositionX'))
//         // X轴位置交给本身
//     $(this).css('backgroundPositionX', leftFloorCurr - 40 + 'px')
//         // 为右侧内容设置滑动上去之后显示的效果
//     $(this).stop(true, false).animate({
//         width: '80px'
//     }, 100)
// }, function() {
//     //定义一个leftFloorCurr,存储背景定位的X轴位置
//     var leftFloorCurr = parseInt($('.leftFloor .active').css('backgroundPositionX'))
//         // X轴位置交给本身
//     $(this).css('backgroundPositionX', leftFloorCurr + 40 + 'px')
//         // 移除身上的active
//     $('.leftFloor li').removeClass('active')
//         // 为右侧内容设置滑动上去之后隐藏的效果
//     $(this).stop(true, true).animate({
//         width: '40px'
//     }, 100)
// })

// // 定义楼层的滚动效果
// $('.leftFloor li').on('click', function() {
//     var a = 1100;
//     $('html,body').animate({
//         scrollTop: a + $(this).index() * 610
//     }, 1000)
// })


// // 定义右侧楼层的效果,
// $('.rightFloor .discount').on('click', function() {
//     // 点击时,右侧的span移除
//     $(this).find('span').stop(true, false).animate({
//         right: '40px'
//     })
// }).on('mouseout', function() {
//     // 鼠标移出,则右侧的二维码隐藏
//     $(this).find('span').animate({
//         right: '-60px'
//     })
// })

// 为二维码增加hover则暂时不隐藏的效果,并解决了动画一直在播放的bug
$('.rightFloor .discount span').hover(function() {
    $(this).stop(true, false).animate({
        right: '40px'
    })
}, function() {
    $(this).stop(true, true).animate({
        right: '-60px'
    })
})