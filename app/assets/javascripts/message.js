$(function(){
  function build_message(message){
    let image = (message.image? `<img src = ${message.image}>`: "");

    let html = `<div class="right-contents__center__message" data-message_id=${message.id}>
                  <div class="right-contents__center__message__top">
                    <div class="right-contents__center__message__top__box">
                      <div class="right-contents__center__message__top__box__user-name">
                        ${message.name}
                      </div>
                      <div class="right-contents__center__message__top__box__time">
                        ${message.date}
                      </div>
                    </div>
                  </div>
                  <div class="right-contents__center__message__bottom">
                    <div class="right-contents__center__message__bottom__message">
                      ${message.body}
                    </div>
                    <div class="right-contents__center__message__bottom__message">
                      ${image}
                    </div>
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
      $('.new_message')[0].reset();
      $(".right-contents__bottom__submit").removeAttr("disabled");
      $('.right-contents__center').animate({ scrollTop: $('.right-contents__center')[0].scrollHeight});
    })

    .fail(function(){
      alert('メッセージを入力してください');
    })
  })
});