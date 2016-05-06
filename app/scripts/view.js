var eventView ={
  init: function() {
    controler.init();
    eventView.render();
  },

  render: function () {
    var eventViewArea = $('#eventViewArea');
    var events = controler.getEvents();
    for (var meetupEvent in events) {
      var eventName = $('<h3> Event name: ' + events[meetupEvent].name + '</h2>');
      var eventType = $('<p> Event type: ' + events[meetupEvent].type + '</p>');
      var eventHost = $('<p> Event host: ' + events[meetupEvent].host + '</p>');
      var eventStart = $('<p> Event start: ' + events[meetupEvent].start + '</p>');
      var eventEnd = $('<p> Event end: ' + events[meetupEvent].end + '</p>');
      var eventAttendees = $('<p> Event attendees: ' + events[meetupEvent].attendees + '</p>');
      var eventAddress = $('<p> Event address: ' + events[meetupEvent].address + '</p>');
      eventViewArea.append(eventName);
      eventViewArea.append(eventType);
      eventViewArea.append(eventHost);
      eventViewArea.append(eventStart);
      eventViewArea.append(eventEnd);
      eventViewArea.append(eventAttendees);
      eventViewArea.append(eventAddress);
      eventViewArea.append('<hr>');
    }
  }
};
eventView.init();
