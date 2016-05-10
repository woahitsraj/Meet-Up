var firstPasswordInput = document.querySelector('#first');
var secondPasswordInput = document.querySelector('#second');
var emailInput = document.querySelector('#email');

function IssueTracker() {
  this.issues = [];
}
IssueTracker.prototype = {
  add: function (issue) {
    this.issues.push(issue);
  },
  retrieve: function () {
    var message = "";
    switch (this.issues.length) {
      case 0:
        // do nothing because message is already ""
        break;
      case 1:
        message = "Please correct the following issue:\n" + this.issues[0];
        break;
      default:
        message = "Please correct the following issues:\n" + this.issues.join("\n");
        break;
    }
    return message;
  }
};

emailInput.addEventListener("change", function(){
  var email = emailInput.value;
  var emailIssuesTracker = new IssueTracker();
  $('#email').addClass('dirty');
  if(!email.match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i)) {
    emailIssuesTracker.add('Please enter a valid email adddress');
  }
  var emailInputIssues = emailIssuesTracker.retrieve();
  if (emailInputIssues !== "") {
    $('#first').addClass('valid');
  }
  else {
    $('#first').addClass('invalid');
  }
  firstPasswordInput.setCustomValidity(emailInputIssues);


});

firstPasswordInput.addEventListener("change",function(){
  var firstPassword = firstPasswordInput.value;
  var firstInputIssuesTracker = new IssueTracker();
  $('#first').addClass('dirty');

    if (firstPassword.length < 6) {
      firstInputIssuesTracker.add("fewer than 6 characters");
    } else if (firstPassword.length > 100) {
      firstInputIssuesTracker.add("greater than 100 characters");
    }

    if (!firstPassword.match(/[\!\@\#\$\%\^\&\*]/g)) {
      firstInputIssuesTracker.add("missing a symbol (!, @, #, $, %, ^, &, *)");
    }

    if (!firstPassword.match(/\d/g)) {
      firstInputIssuesTracker.add("missing a number");
    }

    if (!firstPassword.match(/[a-z]/g)) {
      firstInputIssuesTracker.add("missing a lowercase letter");
    }

    if (!firstPassword.match(/[A-Z]/g)) {
      firstInputIssuesTracker.add("missing an uppercase letter");
    }

    var illegalCharacterGroup = firstPassword.match(/[^A-z0-9\!\@\#\$\%\^\&\*]/g);
    if (illegalCharacterGroup) {
      illegalCharacterGroup.forEach(function (illegalChar) {
        firstInputIssuesTracker.add("includes illegal character: " + illegalChar);
      });
    }
    var firstInputIssues = firstInputIssuesTracker.retrieve();
    if (firstInputIssues !== "") {
      $('#first').addClass('valid');
    }
    else {
      $('#first').addClass('invalid');
    }
    firstPasswordInput.setCustomValidity(firstInputIssues);
});

secondPasswordInput.addEventListener("change",function(){
  var secondPassword = secondPasswordInput.value;
  var secondInputIssuesTracker = new IssueTracker();
  $('#first').addClass('dirty');
  if (firstPassword === secondPassword && firstPassword.length > 0) {
    /*
    They match, so make sure the rest of the requirements have been met.
     */
  } else {
    secondInputIssuesTracker.add("Passwords must match!");
  }
  var secondInputIssues = secondInputIssuesTracker.retrieve();
  if (secondInputIssues !== "") {
    $('#second').addClass('valid');
  }
  else {
    $('#second').addClass('invalid');
  }
  firstPasswordInput.setCustomValidity(firstInputIssues);
  secondPasswordInput.setCustomValidity(secondInputIssues);

});
