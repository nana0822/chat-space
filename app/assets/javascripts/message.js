$(function(){
    function buildHTML(message) {
      if ( message.image ) {
      var content = message.content ? `${ message.content }` : "";
      var image = message.is_image_present ? `<img src='${message.image.url}'> ` : ''
      var html = `<div class="message" data-message-id="${message.id}"> 
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${message.user_name}
            </div>
            <div class="upper-message__date">
              ${message.created_at}
            </div>
          </div>
          <div class="lower-meesage">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
    return html;
  } else {
    var html =
     `<div class="message">
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name}
          </div>
          <div class="upper-message__date">
            ${message.created_at}
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
      </div>`
    return html;
  };
}
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html =buildHTML(message);
      $('.messages').append(html)
      $('#new_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('error')

    })
      return false;
    })
  
    var reloadMessages = function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
       var last_message_id = $('.message:last').data("message-id");
       var href = 'api/messages#index {:format=>"json"}' 
       $.ajax({
        url: href,
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id }
       })
      .done(function (messages) {
       if (messages.length !== 0) {
       var insertHTML ='';
       $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
       }
     })
     .fail(function () {
        alert('error');
     });
    }
   };
   if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
   }
});