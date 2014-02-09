// Get a reference to the root of the chat data.
var url = 'https://burning-fire-1978.firebaseio.com/',
    messagesRef = new Firebase(url + 'messages'),
    renderedStickies = []; //references to all the stickies that have been rendered

// When the user presses enter on the message input, write the message to firebase.
$('#messageInput').keypress(function (e) {
  var myMessages = messagesRef.push(),
      name = $('#nameInput').val(),
      text = $('#messageInput').val(),
      timeNow = (new Date().getTime());

  if (e.keyCode == 13) {
    myMessages.set({name:name, text:text, time:timeNow});
    $('#messageInput').val('');
  }
});

// render the messages
var render = function (snapshot) {
  var message = snapshot.val();
  // if a sticky gets rendered, push some data into the renderedStickies array to keep track of it
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
      renderedStickies.splice(i, 1); //remove the element from the rendered array
    }
  }

  for(var i = 0; i < myExpiredRefs.length; i++) {
    myRef = new Firebase(url + 'messages/' + myExpiredRefs[i].loc);
    myRef.remove();
    myExpiredRefs.splice(i, 1); //remove the element from the expired array
  }
}

// Add a callback that is triggered for each chat message.
messagesRef.limit(10).on('child_added', render);

messagesRef.on('child_removed', function(snapshot) {
  var message = snapshot.val(),
      myNode = $('#'+message.time);

      myNode.addClass('disappear');

  setTimeout(function() {
    myNode.remove();
  }, 1000)
  
})
setInterval(myTimeout, 1000)