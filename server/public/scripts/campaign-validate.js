$(document).ready(function() {
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
      // alert("Valid form submitted");
      // return false;
      form.submit();
    }
  });
});