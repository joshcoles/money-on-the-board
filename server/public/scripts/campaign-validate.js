$(document).ready(function() {
  $.validator.setDefaults({
       ignore: []
  });
  $('#campaign-new').validate({
    rules: {
      game: {
        required: true,
      },
      campaign_name: {
        required: true,
      },
      description: {
        required: true,
        maxlength: 255
      },
      charity_name: {
        required: true,
      },
      charity_url: {
        required: true,
      },
      image_url: {
        required: true,
      },
      hashtag: {
        required: true,
      }
    },
    submitHandler: function(form) {
      form.submit();
    }
  });
});