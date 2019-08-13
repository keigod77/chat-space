$(document).on("turbolinks:load", function(){

function buildHTML(user){
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>`
}

  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    console.log(input)
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      if (users.length !== 0){
        users.forEach(function(user){
          var html = buildHTML(user)
          $("#user-search-result").append(html)
        });
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    });
  });
});