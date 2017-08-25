;
(function() {
    'use strict';
    var $form_add_task = $('.add-task')
    var task_list = {};

    // 进行localStorage的存储操作
    init()
        // 在点击提交的时候，触发相应的事件
    $('.add-task').on('submit', function(e) {
        var new_task = {}
            // 阻止默认的提交时间,并取出相应的输入值
        e.preventDefault();
        new_task.content = $(this).find('input').val()
        console.log(task_list)
            // 当在输入框中没有输入值的时候,直接返回
        if (!new_task.content) return;
        console.log(1)
        $(this).find('input').val(null);
        // 如果没有输入值,则直接返回,不进行存储等操作
        console.log(new_task.content)

        // 进行添加操作,将new_task添加到task_list
        if (add_task(new_task)) {
            // 
            render_task_list();
        }
        console.log(new_task)

        // 为输入框重新设置焦点,方便下一次输入
        $('.add-task input').focus()
    })

    function add_task(new_task) {
        task_list.push(new_task)
            // 更新localstorage
        store.set('task_list', task_list)
        console.log(task_list)
        return true;
    }

    function init() {
        // store.clear()
        // 从localStorage中获取到相应的task_list
        task_list = store.get('task_list') || []
        render_task_list()
    }

    function render_task_tpl(data, index) {
        if (!data || !index) return;
        var list_item_tpl =
            '<div class="task-item" data-index=' + index + '>' +
            '<span><input type="checkbox"></span>' +
            '<span class="task-content">' + data.content + '</span>' +
            '<span class="delete">delete</span>' +
            '<span class="detail">detail</span>' +
            '</div>'
        return $(list_item_tpl)
    }

    function render_task_list() {
        // 在传值前,先将列表中的值清空一遍,再传值进去
        // 此处为什么必须要全部清空再渲染呢?  因为尝试使用每次添加一个,然后将最后一个添加到文档流的办法,但是因为刷新之后文档流会重新渲染,所以我们刷新之后,每次都只能由最后一条item显示在上面,所以这里只能使用重新渲染的方式解决此问题
        $('.task-list').html('')
        for (var i in task_list) {
            var $task = render_task_tpl(task_list[i], i)
            $('.task-list').prepend($task)
        }
        listen_task_delete()
        listen_task_detail()
    }

    // 因为出现了每次添加之后,不刷新就无法对表格item删除的情况,所以这里让点击事件直接包含在函数中,每次更新就让函数进行重新的绑定
    // 原因是当上下文变化之后,jQuery无法重新查找并监听所有删除按钮的点击事件,所以需要重新进行绑定
    // 问题解决,简直完美~!
    function listen_task_delete() {
        // 设置点击删除掉相应的item
        $('.task-item > span:nth-child(3)').on('click', function() {
            var $item = $(this).parents('.task-item')
            if (confirm('确定删除?')) {
                delete_task($item.attr('data-index'))
            }
            console.log($item.attr('data-index'))
        })
    }

    function delete_task(index) {
        // 如果未传入或传入值不存在,则直接返回
        if (!index || !task_list[index]) return;
        delete task_list[index]
        refresh_task_list()
        render_task_list()
    }

    // 更新localStorage
    function refresh_task_list() {
        store.set('task_list', task_list)
        render_task_list()
    }

    // 操作详情面板
    function listen_task_detail() {
        $('.task-item > span:nth-child(4)').on('click', function() {
            console.log(2)
            var $item = $(this).parents('.task-item')
                // 借用此上下文中的this
            render_task_detail.call(this)
            $('.task-detail-mask').show(400)
            $('.task-detail').show(400)
                // if(confirm('确定删除?')) {
                // 	delete_task($item.attr('data-index'))
                // }
                // console.log($item.attr('data-index'))
        })
    }

    // 点击mask,详情和遮罩都隐藏掉
    $('.task-detail-mask').on('click', function() {
        $('.task-detail-mask').hide(200)
        $('.task-detail').hide(200)
    })

    // 设置task_detail的显示文字
    function render_task_detail() {
        var i = $(this).parents('.task-item').attr('data-index')
        console.log(i)
        if (!i || !task_list[i]) return;
        var item = task_list[i]
        var tpl = '<form><div class="content"></div>\
		<div class="desc">' + item.content + '</div>\
		<div class="remind">\
			<input type="date">\
			<textarea name="textarea" id=""></textarea>\
		</div><button type="submit">更新</button></form>';
        $('.task-detail').html('');
        console.log($('.task-detail').html())
        $('.task-detail').html(tpl);
    }

})()