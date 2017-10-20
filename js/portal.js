	var Twit = require('twit')

	var T = new Twit({
	  consumer_key:         'OUjwUJqiRoqpG0gTlZcgA1mv2',
	  consumer_secret:      'prILcGZOQL9bRBrnk41tD1IdE4ZTNkGuYTfvtngvRtXk9rua1H',
	  app_only_auth: true,
	  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
	})

//Note that Application-only auth will not allow you to perform requests to
//API endpoints requiring a user context, such as posting tweets.

	T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
	  console.log(data)
	})

	//  filter the twitter public stream for specific hashtag
	//T.stream(path, [params]) keeps the connection alive, and returns an EventEmitter.

	var stream = T.stream('statuses/filter', { track: '#development', language: 'en' })

	stream.on('tweet', function (tweet) {
	  console.log(tweet)
	})

	console.log("Sanity Check: JS is working!");


	$(document).ready(function(){
	// Search function for the keyword
		$('#getPosts').submit(function(event){
			event.preventDefault();
			$('.result').empty();
			var search = $('#search').val();
			console.log(search);
		$.ajax({
			method: 'GET',
			url: 'https://api.twitter.com/1.1/search/tweets.json',
			data:{
			q: search,
		},
			success: onSuccess
			// console.log(search);

		})
})

		function onSuccess(response){
			console.log(response)
			// var statuses = response.statuses
		}
})
