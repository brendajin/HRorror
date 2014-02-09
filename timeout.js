var Firebase = require('firebase'),
	url = 'https://burning-fire-1978.firebaseio.com/',
    messagesRef = new Firebase(url + 'messages');

exports.init = function() {

	var myMessages = messagesRef.push(),
		name = 'buddy',
		text = 'this is a test',
		timeNow = (new Date().getTime());

	setInterval(function() {
		myMessages.set({name:name, text:text, time:timeNow})
	}, 20*1000)
};