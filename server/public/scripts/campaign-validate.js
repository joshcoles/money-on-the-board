$(document).ready(function() {
  $('#campaign-new').validate({
    rules: {
      game: {
        required: true,
        min: 1
      },
      campaign_name: {
        required: true,
      },
      description: {
        required: true,
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