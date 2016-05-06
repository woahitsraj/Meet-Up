var model = {
  events: [

  ]
};

var controler = {
  init: function() {
      model.events = JSON.parse(localStorage.getItem("events"));
  },

  getEvents: function() {
      return model.events;
  },

  addNewEvent: function(event) {
      model.events.push(event);
      localStorage.setItem("events", JSON.stringify(model.events));
  },


};
