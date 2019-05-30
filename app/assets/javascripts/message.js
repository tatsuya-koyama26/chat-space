$(document).on('turbolinks:load', function() {
  $(function(){
    function buildHTML(message){
      image = (message.image) ? `<img class="lower-message__image" src="${ message.image }">`: "";
      var html = `<div class="message" data-id="${ message.id }">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${ message.user_name }
                      </div>
                      <div class="upper-message__date">
                        ${ message.created_at }
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${ message.content }
                      </p>
                      ${ image }
                    </div>
                  </div>`;
      return html;
    }
  function scroll() {
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
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
      var path = location.pathname.split('/');
      var path_id = path[2];
      var url = `/groups/${path_id}/api/messages`
      $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message){
          if (message.id > last_message_id){
            insertHTML += buildHTML(message);
            $('.message').append(insertHTML)
            scroll()
          }
        })
      })
      .fail(function() {
        alert('error');
      })
    };
    if(location.href.match(/\/groups\/\d+\/messages/)){
      setInterval(reloadMessages, 5000);
    }
  })
})