$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var body = message.body ? `${ message.body }` : "";
    var image = message.image ? `${ message.image }` : "";
    var html = `<div class="message" data-id=${message.id}>
                  <div class="message-info">
                    <p class="message-info__user">${message.user_name}</p>
                    <p class="message-info__time-stamp">${message.created_at}</p>
                  </div>
                  <div class="message__text">
                    <p class="message__text--body">${body}</p>
                    <img class="message__text--image" src=${image}>
                  </div>
                </div>`
    return html;
  }
  $("#new_message").on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
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
      $('.messages').append(html)
      $('#new_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('メッセージを入力して下さい')
    })
    .always(function(data){
      $('.form__submit-btn').prop('disabled', false);
    })
  })
  var reloadMessages = function() {
    last_message_id = $('.message:last').data('id');
    function buildHTML(message) {
      var body = message.body ? `${ message.body }` : "";
      var image = message.image ? `${ message.image }` : "";
      var html = `<div class="message" data-id=${message.id}>
                    <div class="message-info">
                      <p class="message-info__user">${message.user_name}</p>
                      <p class="message-info__time-stamp">${message.created_at}</p>
                    </div>
                    <div class="message__text">
                      <p class="message__text--body">${body}</p>
                      <img class="message__text--image" src=${image}>
                    </div>
                  </div>`
      return html;
    }

    $.ajax({
      url: 'api/messages',
      type: "GET",
      dataType: 'json',
      data: { id: last_message_id }
    })
    .done(function(messages) {
      var insertHTML = '';
      if (messages.length !== 0) {
        messages.forEach(function(message) {
          insertHTML += buildHTML(message);
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        })
      }
    })
    .fail(function() {
      alert('自動更新に失敗しました')
    })
  };
  setInterval(reloadMessages, 5000);
});
