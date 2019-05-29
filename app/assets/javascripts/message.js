$(document).on('turbolinks:load', function() {
$(function(){
  function buildHTML(message){
    var image = "";
    image = (message.image) ? `<img class="lower-message__image" src="${ message.image }">`: "";
    var html = `<div class="message">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${ message.user_name }
                    </div>
                    <div class="upper-message__date">
                      ${ message.time }
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${ message.content }
                    </p>
                    ${image}
                  </div>
                </div>`;
    return html;
  }
function scroll() {
  $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
}
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
      scroll()
    })
    .fail(function(){
      alert('メッセージが送信できませんでした');
    })
  })
  var reloadMessages = function() {
    last_message_id = $('.message').last().data('id')
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      messages.forEach(function(massage){
        var insertHTML = '';
        $('.message').append(insertHTML)
      })
    })
    .fail(function() {
      console.log('error');
    });
  };
  setInterval(reloadMessages, 12225000);
})
})