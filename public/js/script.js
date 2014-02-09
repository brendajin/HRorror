  // Get a reference to the root of the chat data.
  var messagesRef = new Firebase('https://burning-fire-1978.firebaseio.com:443/');

  // When the user presses enter on the message input, write the message to firebase.
  $('#messageInput').keypress(function (e) {
    if (e.keyCode == 13) {
      var 	name = $('#nameInput').val(),
      		text = $('#messageInput').val(),
      		timeNow = (new Date().getTime());
      messagesRef.push({name:name, text:text, time:timeNow});
      $('#messageInput').val('');
    }
  });

  // Add a callback that is triggered for each chat message.
  messagesRef.limit(10).on('child_added', function (snapshot) {
    var message = snapshot.val();
    $('<div class="sticky"/>').text(message.text).prepend($('<span/>')
      .text(message.name+': ')).appendTo($('#messagesDiv'));
    console.log(message.time)
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
  });