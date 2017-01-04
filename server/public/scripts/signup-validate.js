$(document).ready(function() {
  $('#signup').validate({
    rules: {
      username: {
        required: true,
      },
      email: {
        required: true,
      },
      password: {
        required: true,
      },
      confirm_password: {
        required: true
      }
    },
    submitHandler: function(form) {
      form.submit();
    }
  });
});