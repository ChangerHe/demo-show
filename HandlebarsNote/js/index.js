;(function($) {

    var getClasses = "http://imoocnote.calfnote.com/inter/getClasses.php"

    $.getJSON(getClasses, {curPage: 1}, function(data) {
        console.log(data.data)

        var t = $('#class-template').html()
        var f = Handlebars.compile(t)
        var h = f(data.data)
        $('#card').html(h)
    })

    Handlebars.registerHelper('equal', function(v1, v2, option) {
        if(v1 == v2) {
            return option.fn(this)
        } else {
            return option.inverse()
        }
    })

    Handlebars.registerHelper('long',function(v1, option) {
        if(v1.indexOf('小时') >= 0) {
            return option.fn(this)
        } else {
            return option.inverse()
        }
    })
})(jQuery)