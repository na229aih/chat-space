$(function(){

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
      console.log(message);
    })

    .fail(function(){

    })
  })
});