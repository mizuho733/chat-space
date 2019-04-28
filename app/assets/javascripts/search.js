$(function() {

  var search_list = $('#user-search-result')

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_list.append(html)
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">${msg}</div>`
    search_list.append(html)
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    console.log(input)
    $.ajax({
      url: '/users',
      type: 'GET',
      dataType: 'json',
      data: { name: input },
    })
    .done(function(users) {
      console.log(users);
      $('#user-search-result').empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーがいません")
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました')
    })

  });
});
