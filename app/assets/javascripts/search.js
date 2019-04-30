$(document).on('turbolinks:load', function() {

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

  function appendUserNameAdd(name, id) {
    var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    return html
  }


  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val().replace(/\s/g, '');
    if(input!==""){
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
    }
  });

  $("#user-search-result").on("click", ".user-search-add", function () {
    var name = $(this).data("user-name");
    var id = $(this).data("user-id");
    var html = appendUserNameAdd(name, id)
    $("#chat-group-users").append(html)
    appendUserNameAdd(name, id);
    $(this).parent().remove();
  });

  $("#chat-group-users").on("click", ".js-remove-btn", function () {
    $(this).parent().remove();
  });
});
