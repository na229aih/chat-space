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
    $(".chat-group-users.js-add-user").append(user_box);
    user_box.remove(".user-search-add");
  });

});