// 以下是自己的jQuery扩展部分
;
(function($) {
    $.fn.extend({
        pub: function(opts) {
            var defaults = {
                searchItem: '创意文具',
                shopCarNum: 0,
                evaluateNum: 100,
                evaluateNumGood: 90,
                evaluateNumBetwween: 8,
                evaluateNumBad: 2
            }
            var prams = $.extend({}, defaults, opts);
            searchItem = prams.searchItem;
            shopCarNum = prams.shopCarNum;
            evaluateNum = prams.evaluateNum;
            evaluateNumGood = prams.evaluateNumGood;
            evaluateNumBetwween = prams.evaluateNumBetwween;
            evaluateNumBad = prams.evaluateNumBad;
            // 将搜索框的推荐搜索值先显示到页面上
            $('.searchItem input[type=text]').prop('value', searchItem)
                // 提供相应的点击隐藏效果
            $('.searchItem input[type=text]').focus(function() {
                if ($(this).prop('value') == searchItem) {
                    $(this).prop('value', '')
                }
            })
            $('.searchItem input[type=text]').blur(function() {
                if ($(this).prop('value') == '') {
                    $(this).prop('value', searchItem)
                }
            })

            // 商品详情页面中对提交的评价数量进行校验,如果校验的总评价数和各评价之和不相等则使用自定义的评价数量,不予修改
            var tal = prams.evaluateNum, // 提交上来的评论总数
                a = prams.evaluateNumGood, //提交上来的好评总数
                b = prams.evaluateNumBetwween, // 提交上来的中评总数
                c = prams.evaluateNumBad // 提交上来的差评总数

            // 如果出现传入数值不正确的情况,则抛出错误
            if (!(tal == (a + b + c))) {
                throw new Error('兄台,你提交的评论总数和评价数有问题啊!')
            }
            // 计算出好评所占的百分比
            var betweenRank = parseInt(b / tal * 100)
            var badRank = parseInt(c / tal * 100)
            var goodRank = parseInt(a / tal * 100)

            // 为了避免出现不能达到百分之百的情况,将差值加到好评上
            goodRank = goodRank + (100 - badRank - betweenRank - goodRank)
                // 将json的值解析至屏幕

            $('.shopCarNum').html(shopCarNum)
            $('.evaluateNum').html(evaluateNum)
            $('.evaluateNumGood').html(evaluateNumGood)
            $('.evaluateNumBetwween').html(evaluateNumBetwween)
            $('.evaluateNumBad').html(evaluateNumBad)
            $('.goodRank').html(goodRank + "%")
            $('.betweenRank').html(betweenRank + "%")
            $('.badRank').html(badRank + "%")

        }
    })
})(jQuery);


// 为文中的样式及文字提供默认显示效果,对应接上了相应的接口,插件在上面
$(window).pub({
    searchItem: '想啥就啥', // 提供搜索栏的默认显示值
    shopCarNum: 0, // 提供购物车的数量
    evaluateNum: 999, // 总的评价数
    evaluateNumGood: 900, // 好评数量
    evaluateNumBetwween: 40, // 中评数量
    evaluateNumBad: 59 // 差评数量
})



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

// 以下是无延迟高容差的菜单效果的封装代码插件部分来自jquery-menu-aim
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

// 定义一个居中的方法,以便复用
// 直接传参相应的id或类名即可,但若想随时居中,记得调用onresize
function center(tag) {
    var top = (document.documentElement.clientHeight - $(tag)[0].clientHeight) / 2;
    var left = (document.documentElement.clientWidth - $(tag)[0].clientWidth) / 2;
    $(tag).css({ 'top': top, 'left': left })
}