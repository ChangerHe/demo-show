// var object = {}

// _.extend(object, Backbone.Events)

// object.once('change:title change:author', (msg) => {
//   alert('tiggered ' + msg)
// })

// object.trigger('change:title', 'an event')

var bill = new Backbone.Model({
  name: "bILL sMITH"
})

bill.on("change:name", (model, name) => {
  alert("Changed name from " + bill.previous("name") + " to " +name)
})
bill.changed.name = 'bill'
// console.log(bill.changed.name)
// bill.set({name: "Bill Jones"})