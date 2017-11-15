// var Sidebar = Backbone.Model.extend({
//   promptColor() {
//     var cssColor = prompt("Please enter a css Color")
//     this.set({color: cssColor})
//   }
// })
// console.log($('#sidebar'))
// window.sidebar = new Sidebar 

// sidebar = new Sidebar 

// sidebar.on('change:color', (model, color) => {
//   $('#sidebar').css({background: color})
// })

// sidebar.set({color: 'white'})

// sidebar.promptColor()



var Meal = Backbone.Model.extend({
  idAttribute: "_id"
})

var cake = new Meal({_id: 2, name: "Cake"})
console.log(_)
alert("Cake id: " + cake.id + cake.attributes._id)
