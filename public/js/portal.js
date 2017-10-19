console.log("Sanity Check: JS is working!");
var $hashsList;
var allHashs=[];
var hashUrl = '/api/hashs';


$(document).ready(function(){
	$hashsList = $('#result');
	$('.mainBody').on('submit',"#getPosts", function(event){
		event.preventDefault();

		var search = $('#search').val();
		console.log(search);
	$.ajax({
		method: 'POST',
		url: hashUrl,
		data: $(this).serialize(),
		success: hashSuccess


	});
})
	
  }
  );
function hashSuccess(json) {
  $('#search').val();
  allHashs.push(json);
  render();
}
  
 function getHashHtml(hash) {
  return `<hr>
          <p>
            <b>${hash.hash}</b>
          </p>`;
}

function getAllHashsHtml(hashs) {
  return hashs.map(getHashHtml).join("");
}

// helper function to render all posts to view
// note: we empty and re-render the collection each time our post data changes
function render () {
  // empty existing posts from view
  $hashsList.empty();

  // pass `allBooks` into the template function
  var HashsHtml = getAllHashsHtml(allHashs);

  // append html to the view
  $hashsList.append(HashsHtml);
};







  // $('#submit').on('submit', function(e) {
  //   e.preventDefault();
  //   $.ajax({
  //     method: 'GET',
  //     url: 'https://api.twitter.com/1.1/search/tweets.json'
  //     success: tweetSuccess,
  //     error: tweetError
  //   });




