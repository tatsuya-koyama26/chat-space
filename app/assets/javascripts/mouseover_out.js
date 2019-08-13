$(document).on('turbolinks:load', function() {
  $(function() {
    var message_btn;
    $('.message').mouseover(function() {
      message_btn = $(this).find('ul')
      message_btn.show();
      message_btn.css("display", "flex")
    })
    $('.message').mouseout(function() {
      message_btn = $(this).find('ul')
      message_btn.hide();
    })
  });
})