$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var imageUrl = message.image.url == null ? "" : `<img class: 'lower-message__image' src=${message.image.url}>`
    var html = `<div class="message" data-message-id='${message.id}'>
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">${message.user_name}</p>
                    <p class="message__upper-info__date">${message.created_at}</p>
                  </div>
                  <p class="message__text">${message.content}</p>
                  ${imageUrl}
                </div>
                `
    return html;
  }

  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data)
      $('.messages').append(html)
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      $('.new_message')[0].reset();
      $('.form__submit').prop('disabled', false)
    })
    .fail(function(){
      alert('error');
    });
  });

  var reloadMessages = function(){
    var last_message_id = $('.message:last').data('message-id');
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {last_id: last_message_id}
    })
    .done(function(messages){
      for (var i = 0 ; i < messages.length; i++){
        var html = buildHTML(messages[i]);
        $('.messages').append(html);
      };
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      console.log('error');
    });
  }
  setInterval(reloadMessages, 5000);
});
