$(function() {

  let search_list = $(".user-search-result")

  function appendUser(user) {
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_list.append(html);
  }

  function appendError() {
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">一致するユーザーが見つかりません</p>
                </div>`
    search_list.append(html);
  }

  function appendchatmember(user_data) {
    let html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${user_data.userId}'>
                  <p class='chat-group-user__name'>${user_data.userName}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    $(".chat-group-users.js-add-user").append(html);
  }

  $("#user-search-field.chat-group-form__input").on("keyup", function() {
    let input = $("#user-search-field.chat-group-form__input").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $(".user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendError();
      }
    })

    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })

  });

  $(document).on("click", ".user-search-add", function(){
    user_box = $(this).parent();
    user_box.remove();
    let user_data = $(this).data();
    appendchatmember(user_data);
  });

  $(document).on("click", ".user-search-remove", function(){
    user_box = $(this).parent();
    user_box.remove();
  });

});