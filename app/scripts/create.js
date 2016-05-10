/*global controler $:true*/
/*eslint no-undef: "error"*/

var eventCreateView = {
  init: function() {
    'use strict';
    var form = $('#eventForm');
    var eventStarDate = $('#eventStart');
    var eventEndDate = $('#eventEnd');
    var dateInputIssues = '';
    eventEndDate.on('change', function(){
      eventEndDate.addClass('dirty');
      if (Date.parse(eventEndDate.val()) < Date.parse(eventStarDate.val())) {
        dateInputIssues = 'Please enter an end date after the start date';
      }
      else {
        dateInputIssues = '';
      }
      if (dateInputIssues !== '') {
        $('#eventEnd').addClass('valid');
      }
      else {
        $('#eventEnd').addClass('invalid');
      }
      document.querySelector('#eventEnd').setCustomValidity(dateInputIssues);

    });
    form.on( 'submit', function() {
        var meetupEvent = {
        };
        $(this).serializeArray().map(function(x){meetupEvent[x.name] = x.value; });
        controler.addNewEvent(meetupEvent);
      });
  }
};

eventCreateView.init();
