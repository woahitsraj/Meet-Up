var model = {
  events: [

  ]
};

var controler = {
  init: function() {
    'use strict';
      model.events = JSON.parse(localStorage.getItem('events'));
  },

  getEvents: function() {
    'use strict';
      return model.events;
  },

  addNewEvent: function(event) {
    'use strict';
      model.events.push(event);
      localStorage.setItem('events', JSON.stringify(model.events));
  }
};
controler.init();
