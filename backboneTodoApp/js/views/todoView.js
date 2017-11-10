window.todoApp = window.todoApp || {}

  ; (function (app) {
    app.TodoView = Backbone.View.extend({
      // 视图定义的两种方式
      // 1. 自定义标签
      // tagName: 'h1',
      // id: 'myid',
      // className: 'title'      

      // 2. 绑定现有标签
      // 直接通过el绑定到现有的标签上
      el: '.todoapp',

      // 声明dom事件, 事件是由视图层的dom触发的
      events: {
        // 事件名称 事件源: 事件处理函数名称
        'keydown .new-todo': 'saveData'
      },
      // 重载模型数据并渲染视图模板
      render() {
        // 绑定reset事件, 页面重置之后触发
        this.todoCollection.on('reset', (data) => {
          console.log(data)
        })
        // 触发
        this.todoCollection.fetch({reset: true})
      },

      // 自定义事件处理函数
      saveData(e) {
        // ie中只有keycode事件, firefox有which和charcode,chrome有keycode,charcode,keycode
        if(e.keyCode === 13) {
          console.log($('.new-todo').val())
          this.todoCollection.create({
            title: 'test',
            value: $('.new-todo').val()
          })
          // 在刷新页面之后就要开始读取数据
        }
      },

      // 初始化函数initialize, 在实例化视图时自动执行
      initialize() {
        this.todoCollection = new TodoCollection()
      }

    })

    // var h1 = new app.TodoView()
    // console.log(h1.$el.html('今天星期五').appendTo('body'))

    var el = new app.TodoView()
    console.log(el)
    el.render()
  })(window)