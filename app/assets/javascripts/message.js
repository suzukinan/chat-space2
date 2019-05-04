$(document).on('turbolinks:load', function(){
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message" data-id="${message.id}">
                  <div class="upper-info">
                    <p class="upper-info__user-name">
                      ${message.user_name}
                    </p>
                    <p class="upper-info__date">
                      ${message.date}
                    </p>
                  </div>
                  <div class="message__text">
                    <p class="message__text__content">
                    ${content}
                    </p>
                    ${img}
                  </div>
                </div>`
  return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = (window.location.href);
    $.ajax({
      url: url,
      type: 'POST',
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      if ( data.content != undefined ){
        var html = buildHTML(data);
        $('.messages').append(html);
        $(".messages").animate({scrollTop:$('.messages')[0].scrollHeight});
        // $('#message_content').val('');
        $('.form__message').val('');
        $('.form__submit').prop('disabled', false);
      }
      else{
        alert("メッセージが空のためエラー")
      }

    })

    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
  });


   // 自動更新 //
  $(function() {
      $(function() {
          if(location.href.match(/\/groups\/\d+\/messages/)) {
              setInterval(update, 5000);
          }
      });
      function update() {
          if($('.message')[0]) {
              var message_id = $('.message').last().data('id');
          }
          $.ajax({
              url: location.href,
              type: 'GET',
              data: {id: message_id},
              dataType :'json'
          })
          .done(function(data) {
              if (data.length !== 0 ){
                $.each(data, function(i, data) {
                  var html = buildHTML(data);
                  $('.messages').append(html);
                  $(".messages").animate({scrollTop:$('.messages')[0].scrollHeight});
                })
              }
          })
          
          .fail(function() {
              // alert('自動更新に失敗しました')
          })
      }
  });
});

