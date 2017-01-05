$(document).ready(function() {
  $('#login-modal').validate({
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