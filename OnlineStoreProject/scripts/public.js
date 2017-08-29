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
            $('.searchItem input[type=text]').prop('value', searchText)
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
                // console.log($('#shopCarNum').html())
            $('#shopCarNum').html(shopCarNum)

        }
    })
})(jQuery)