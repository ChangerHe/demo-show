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
            $('.searchItem input[type=text]').prop('value', searchText)
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
})(jQuery)