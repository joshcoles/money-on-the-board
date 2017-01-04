$(document).ready(function() {

  $.validator.addMethod("valueNotEquals", function(value, element, arg) {
    return arg != value;
  }, "Value must not equal arg.");

  $('#pledge-new').validate({
    rules: {
      team: {
        required: true,
        valueNotEquals: "option1"
      },
      player: {
        required: true,
      },
      inGameEvent: {
        required: true,
        valueNotEquals: "option1"
      },
      pledge: {
        required: true
      }
    },
    messages: {
      team: {
        required: "This is a required field.",
        valueNotEquals: "This is a required field."
      },
      inGameEvent: {
        required: "This is a required field.",
        valueNotEquals: "This is a required field."
      }
    }
    ,
    submitHandler: function(form) {
      // alert("Valid form submitted");
      // return false;
      form.submit();
    }
  });
});