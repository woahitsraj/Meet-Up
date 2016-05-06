var eventView ={
  init: function() {
    controler.init();
    render();
  },

  render: function () {
    var eventViewArea = $('#eventViewArea');
    var events = controler.getEvents();
    for (var meetupEvent in events) {

    }
  }
};
