$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var body = message.body ? `${ message.body }` : "";
    var image = message.image ? `${ message.image }` : "";
    var html = `<div class="message">
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
      $('.form__input-box--text').val('')
    })
    .fail(function(){
      alert('error')
    })
    .always(function(data){
      $('.form__submit-btn').prop('disabled', false);
    })
  })
});
