var eventCreateView = {
  init: function() {
    controler.init();
    var form = $("#eventForm");
    form.on( "submit", function( event ) {
        var meetupEvent = {
        };
        $(this).serializeArray().map(function(x){meetupEvent[x.name] = x.value;});
        controler.addNewEvent(meetupEvent);
      });
  }
};

eventCreateView.init();
