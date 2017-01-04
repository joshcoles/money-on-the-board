$(document).ready(function() {
  $('#login').validate({
    rules: {
      username: {
        required: true,
      },
      password: {
        required: true,
      },
    },
    submitHandler: function(form) {
      form.submit();
    }
  });
});