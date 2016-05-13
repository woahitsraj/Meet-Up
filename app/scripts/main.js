/*global $:true*/
/*eslint no-undef: "error"*/
var model = {
  events: []
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
      model.events = model.events || [];
      model.events.push(event);
      localStorage.setItem('events', JSON.stringify(model.events));
  }
};

controler.init();

var eventCreateView = {
  init: function() {
    'use strict';
    var form = $('#eventForm');
    var eventStarDate = $('#eventStart');
    var eventEndDate = $('#eventEnd');
    var dateInputIssues = '';
    var eventValidation = function(){
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
    };
    eventEndDate.on('change', eventValidation);
    eventStarDate.on('change', eventValidation);
    form.on( 'submit', function() {
        var meetupEvent = {};
        $(this).serializeArray().map(function(x){meetupEvent[x.name] = x.value; });
        controler.addNewEvent(meetupEvent);
      });
  }
};

eventCreateView.init();

var eventView = {
  init: function() {
    'use strict';
    eventView.render();
  },

  render: function () {
    'use strict';
    var eventViewRow = $('#eventViewArea');
    var events = controler.getEvents();
    for (var meetupEvent in events) {
      var eventViewArea = $('<div class="col-md-6"></div>');
      eventViewRow.append(eventViewArea);
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
      if (events[meetupEvent].message !== undefined) {
        var eventMessage = $('<p> Event message: ' + events[meetupEvent].message + '</p>');
        eventViewArea.append(eventMessage);
      }
      eventViewArea.append('<hr>');
    }
  }
};
eventView.init();


var firstPasswordInput = $('#first');
var secondPasswordInput = $('#second');
var emailInput = $('#email');

function IssueTracker() {
  'use strict';
  this.issues = [];
}
IssueTracker.prototype = {
  add: function (issue) {
    'use strict';
    this.issues.push(issue);
  },
  retrieve: function () {
    'use strict';
    var message = '';
    switch (this.issues.length) {
      case 0:
        // do nothing because message is already ''
        break;
      case 1:
        message = 'Please correct the following issue:\n' + this.issues[0];
        break;
      default:
        message = 'Please correct the following issues:\n' + this.issues.join('\n');
        break;
    }
    return message;
  }
};

emailInput.on('change', function(){
  'use strict';
  var email = emailInput.val();
  var emailIssuesTracker = new IssueTracker();
  emailInput.addClass('dirty');
  if(!email.match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i)) {
    emailIssuesTracker.add('Please enter a valid email adddress');
  }
  var emailInputIssues = emailIssuesTracker.retrieve();
  if (emailInputIssues === '') {
    emailInput.addClass('valid');
    emailInput.removeClass('invalid');
  }
  else {
    emailInput.addClass('invalid');
    emailInput.removeClass('vaild');
  }
  document.querySelector('#email').setCustomValidity(emailInputIssues);
});

firstPasswordInput.on('change', function(){
  'use strict';
  var firstPassword = firstPasswordInput.val();
  var firstInputIssuesTracker = new IssueTracker();
  firstPasswordInput.addClass('dirty');
    if (firstPassword.length < 6) {
      firstInputIssuesTracker.add('fewer than 6 characters');
    } else if (firstPassword.length > 100) {
      firstInputIssuesTracker.add('greater than 100 characters');
    }

    if (!firstPassword.match(/[\!\@\#\$\%\^\&\*]/g)) {
      firstInputIssuesTracker.add('missing a symbol (!, @, #, $, %, ^, &, *)');
    }

    if (!firstPassword.match(/\d/g)) {
      firstInputIssuesTracker.add('missing a number');
    }

    if (!firstPassword.match(/[a-z]/g)) {
      firstInputIssuesTracker.add('missing a lowercase letter');
    }

    if (!firstPassword.match(/[A-Z]/g)) {
      firstInputIssuesTracker.add('missing an uppercase letter');
    }

    var illegalCharacterGroup = firstPassword.match(/[^A-z0-9\!\@\#\$\%\^\&\*]/g);
    if (illegalCharacterGroup) {
      illegalCharacterGroup.forEach(function (illegalChar) {
        firstInputIssuesTracker.add('includes illegal character: ' + illegalChar);
      });
    }
    var firstInputIssues = firstInputIssuesTracker.retrieve();
    if (firstInputIssues === '') {
      firstPasswordInput.addClass('valid');
      firstPasswordInput.removeClass('invalid');
    }
    else {
      firstPasswordInput.addClass('invalid');
      firstPasswordInput.removeClass('valid');
    }
    document.querySelector('#first').setCustomValidity(firstInputIssues);
});

secondPasswordInput.on('change', function(){
  'use strict';
  var secondPassword = secondPasswordInput.val();
  var firstPassword = firstPasswordInput.val();
  var secondInputIssuesTracker = new IssueTracker();
  secondPasswordInput.addClass('dirty');
  if (firstPassword === secondPassword && firstPassword.length > 0) {
  } else {
    secondInputIssuesTracker.add('Passwords must match!');
  }
  var secondInputIssues = secondInputIssuesTracker.retrieve();
  if (secondInputIssues === '') {
    secondPasswordInput.addClass('valid');
    secondPasswordInput.removeClass('invalid');
  }
  else {
    secondPasswordInput.addClass('invalid');
    secondPasswordInput.removeClass('valid');
  }
  document.querySelector('#second').setCustomValidity(secondInputIssues);
});

