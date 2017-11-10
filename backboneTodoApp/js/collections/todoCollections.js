window.todoApp = window.todoApp || {}

;(function(app) {
  app.TodoCollection = Backbone.Collection.extend({
    // 指定集合所使用的模型
    model: app.TodoModel,
    // 设置数据库链接信息
    // 1. 链接远程接口
    // url() {
    //   return './data/user.json'
    // }
    // 2.链接本地存储
    localStorage: new Backbone.LocalStorage('todo')
  })
  var todo = new app.TodoCollection()
  
  // todo.fetch()
  // // setTimeout(function() {
  //   console.log(todo)
  // // }, 2000);

  // 添加数据, 会触发create事件
  

  todo.on('reset', () => {
    console.log('数据已获取', todo)
  })

  todo.fetch({reset: true})
})(window)