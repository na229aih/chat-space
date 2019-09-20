$(function() {
  
  $("#user-search-field.chat-group-form__input").on("keyup", function() {
    let input = $("#user-search-field.chat-group-form__input").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(products) {

    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })

  });
});