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
		console.log(search);

	})
	

	function onSuccess(response){
		console.log(response)
		// var statuses = response.statuses
	}





	})


  // $('#submit').on('submit', function(e) {
  //   e.preventDefault();
  //   $.ajax({
  //     method: 'GET',
  //     url: 'https://api.twitter.com/1.1/search/tweets.json'
  //     success: tweetSuccess,
  //     error: tweetError
  //   });




  });