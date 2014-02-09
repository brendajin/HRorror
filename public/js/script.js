var url = 'https://burning-fire-1978.firebaseio.com/'

// Get a reference to the root of the chat data.
var messagesRef = new Firebase(url + 'messages');

var renderedStickies = [];

// When the user presses enter on the message input, write the message to firebase.
$('#messageInput').keypress(function (e) {
  var myMessages = messagesRef.push()


  if (e.keyCode == 13) {
    var name = $('#nameInput').val(),
    		text = $('#messageInput').val(),
    		timeNow = (new Date().getTime());
    myMessages.set({name:name, text:text, time:timeNow});
    $('#messageInput').val('');
  }
});

// render the messages
var render = function (snapshot) {
  var message = snapshot.val();
  renderedStickies.push({loc: snapshot.name(), time: message.time});

  $('<div id=' + message.time + ' class="sticky"/>').text(message.text).prepend($('<span/>')
    .text(message.name+': ')).appendTo($('#messagesDiv'));
  $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
}


//create a timeout function that counts down from 30 seconds, then removes the entry from the server at expiration
var myTimeout = function() {
  var myTime = (new Date().getTime()),
      myExpiredRefs = [],
      myRef = '';

  for(var i = 0; i < renderedStickies.length; i++) {
    if(myTime - renderedStickies[i].time > 30*1000) {
      myExpiredRefs.push(renderedStickies[i]);
    }
  }

  for(var i = 0; i < myExpiredRefs.length; i++) {
    myRef = new Firebase(url + 'messages/' + myExpiredRefs[i].loc);
    myRef.remove();
  }
}

// Add a callback that is triggered for each chat message.
messagesRef.limit(10).on('child_added', render);

messagesRef.on('child_removed', function(snapshot) {
  var message = snapshot.val();
  $('#'+message.time).remove();
})
setInterval(myTimeout, 1000)