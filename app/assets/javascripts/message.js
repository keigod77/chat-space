$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var imageUrl = message.image.url == null ? "" : `<img class: 'lower-message__image' src=${message.image.url}>`
    var html = `<div class="message">
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
      $('.new_message')[0].reset();
      $('.form__submit').prop('disabled', false)
    })
    .fail(function(){
      alert('error');
    });
  });
});