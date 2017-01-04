$(document).ready(function() {
  $('#pledge-new').validate({
    rules: {
      team: {
        required: true,
      },
      player: {
        required: true,
      },
      inGameEvent: {
        required: true,
      },
      pledge: {
        required: true
      }
    },
    submitHandler: function(form) {
      form.submit();
    }
  });
});