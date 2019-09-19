$(function(){

  function build_message(message){
    let html = `<div class="right-contents__center__top">
                  <div class="right-contents__center__top__box">
                    <div class="right-contents__center__top__box__user-name">
                      ${message.name}
                    </div>
                    <div class="right-contents__center__top__box__time">
                      ${message.date}
                    </div>
                  </div>
                </div>`
                // <div class="right-contents__center__bottom">
                //   ${if(message.body.present?)}
                //     <div class="right-contents__center__bottom__message">
                //       ${message.body}
                //       ${image_tag message.image.url if message.image.present?}
                //     </div>
                //   ${end}
                // </div>
    return html;
  }

  $('.new_message').on('submit', function(e){

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
    })

    .fail(function(){
      alert('エラー');
    })
  })
});