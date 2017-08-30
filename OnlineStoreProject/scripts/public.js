/**
 * 这里为为后端提供相应的接口处
 *      .shopCarNum  购物车的数量,此类可直接写在需要写入购物车数量的地方
 *      .searchItem  搜索框的内容区域,一般建议使用form作为标签,以此名称作为类名
 *      
 *      
 */

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


// 以下是无延迟高容差的菜单效果
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