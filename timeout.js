var Firebase = require('firebase');



exports.init = function() {
	var myRootRef = new Firebase('https://burning-fire-1978.firebaseio.com:443/');
	myRootRef.on('child_added', function(snapshot) {
		console.log(snapshot)
	});	
}