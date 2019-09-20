$(function(){
  function build_message(message){
    let text = (message.image?  "": "");

    let html = `<div class="right-contents__center__top">
                  <div class="right-contents__center__top__box">
                    <div class="right-contents__center__top__box__user-name">
                      ${message.name}
                    </div>
                    <div class="right-contents__center__top__box__time">
                      ${message.date}
                    </div>
                  </div>
                </div>
                <div class="right-contents__center__bottom">
                  <div class="right-contents__center__bottom__message" data-message_id=${message.id}>
                    ${text}
                  </div>
                </div>`
    return html;
  }

  $('.new_message').on('submit',function(e){

    e.preventDefault();
    let formdata = new FormData(this);
    let url = $(this).attr('action');
    
    $.ajax({
      url: url,
      type: 'POST',
      data: formdata,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message){
      let html = build_message(message);
      $('.right-contents__center').append(html);
      $('.right-contents__bottom__message').val('');
      $(".right-contents__bottom__submit").removeAttr("disabled");
      $('.right-contents__center').animate({ scrollTop: $('.right-contents__center')[0].scrollHeight});
    })

    .fail(function(){
      alert('メッセージを入力してください');
    })
  })
});