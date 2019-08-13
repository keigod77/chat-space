$(document).on("turbolinks:load", function(){

function buildHTML(user){
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>`
  return html;
}

function appenErrMsgToHTML(){
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">一致するユーザーが見つかりません</p>
              </div>`
  return html;
}

  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0){
        users.forEach(function(user){
          var html = buildHTML(user)
          $("#user-search-result").append(html)
        });
      }
      else{
        var html = appenErrMsgToHTML();
        $("#user-search-result").append(html)
      }
      if (input == []){
        $("#user-search-result").empty()
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    });
  });


function innerHTML(id, name){
  html = `<div class='chat-group-user'>
            <input name='group[user_ids][]' type='hidden' value='${id}'>
            <p class='chat-group-user__name'>${name}</p>
            <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
          </div>`
  return html;
}
  $(document).on("click", '.chat-group-user__btn--add', function(){
    var user_id = $(this).attr('data-user-id')
    let user_name = $(this).attr('data-user-name')
    console.log(user_id)
    var html = innerHTML(user_id, user_name)
    $("#chat-group-users").append(html)
    $(this).parent().remove()
  })

  $(document).on('click', '.chat-group-user__btn--remove', function(){
    $(this).parent().remove()
  })

  $(".chat-group-form__action-btn").on("click", function(){
    $("#user-search-field").val('')
  })
});