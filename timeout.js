var Firebase = require('firebase'),
	url = 'https://burning-fire-1978.firebaseio.com/',
    messagesRef = new Firebase(url + 'messages');


var fakeMessages = [
    {
        "text": "I came back to the office from getting a coffee and my HR person called me into the office.  I saw a water bottle and a box of tissues on the table.  She told me I was getting fired.  She handed me a tissue and passed me the bottle of water.  I asked her why and she said you just don't know how to do this job.  If I were you I would be pulling my hair out.  The job you do sucks.  I was like dafuq!!!!! So evil",
        "name": "DeeDee Hernandez"
    },
    {
        "text": "The director of Human Resources told everyone in the office about my Tinder dating.",
        "name": "Brian Fido"
    },
    {
        "text": "I know this person who made out with a midget",
        "name": "jj jones"
    },
    {
        "text": "i'm so chewy and delish",
        "name": "choc chip"
    },
	 {
        "text": "Are you drunk right now?",
        "name": "Drake"
    },
     {
        "text": "Business analyst quit at beginning of the budget process.  No going away party for biz analyst, she only gave two weeks.  It was sad",
        "name": "Ben Wexley"
    },
    {
        "text": "All she wanna do is get naked.",
        "name": "Sage the Gemini"
    },
    {
        "text": "Working at non-profits sux",
        "name": "Corrina Real"
    },
     {
        "text": "14 emails in the span of 40 minutes?! WTF",
        "name": "Emilie"
    },
     {
        "text": "Say they will pay for continuing education and then DENY you when you submit the proposal.",
        "name": "Idelia Buttley"
    },
    {
        "text": "I don't even know how I got this job!",
        "name": "CEO of non-profit"
    },
    {
        "text": "Retirement options not documented in HR packet",
        "name": "Katy Perry"
    },
    {
    	"text": "My boss won't stop saying \"low hanging fruit\" while making an obscene gesture",
    	"name": "Assistant P"
    }
]

exports.init = function() {

	setInterval(function() {
		var myMessages = messagesRef.push(),
		name = 'buddy',
		text = 'this is a test',
		timeNow = (new Date().getTime());
		i = Math.floor(Math.random() * (fakeMessages.length + 1));

		myMessages.set({
			name:fakeMessages[i].name,
			text:fakeMessages[i].text.substring(0, 140),
			time:timeNow
		})
	}, 6*1000)
};