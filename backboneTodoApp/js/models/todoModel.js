
// 定义一个全局对象, 用于定义app的所有子类
window.todoApp = window.todoApp || {}

;(function(app){
  app.TodoModel = Backbone.Model.extend({
    defaults: {
      name: '默认标题',
      completed: false
    }
  })
})(window)


