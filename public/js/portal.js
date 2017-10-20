// console.log("%cGETOUT!", "color: red; font-size:150px;"); 
var $hashsList;;
var allHashs = [];
var allResult;
var hashUrl = '/api/hashs';
var $tweetList;


$(document).ready(function() {
    $hashsList = $('#result');
    $tweetList = $('#result2');
    $('.mainBody').on('submit', "#getPosts", function(event) {
        event.preventDefault();
        var search = $('#search').val();
        console.log(search);
        console.log($(this).serialize());
        $.ajax({
            method: 'POST',
            url: hashUrl,
            data: $(this).serialize(),
            success: hashSuccess,
            error: function(a, b, c) {
                console.log(b);
                console.log(c);
            }
        });
        // $.ajax({
        // 	method: 'GET',
        // 	url: 'search/tweets',
        // 	data: $(this).serialize(),
        // 	success: willSuccess,
        // 	error: function(a,b,c){
        // 		console.log(a,b,c)
        // 	}
        // });

    })

});


function hashSuccess(json) {
    console.log(json);
    $('#search').val();
    allHashs.push(json);
    render();
}
// function willSuccess(json) {
//  allHashs="";
//  allHashs = json;
//  console.log(allHashs);
//   render();
// }

function getHashHtml(hash) {
    var abc = ''
    for (i = 0; i < hash.statuses.length; i++) {
        var sb = hash.statuses[i].text;
        var id = hash.statuses[i].id;
        console.log(id);
        abc += `<hr>
          <p>
            <b>${sb}</b>
            <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${id}>Delete</button>
          </p>`;
    }

    return abc;

}

function getAllHashsHtml(hashs) {
    return hashs.map(getHashHtml).join("");
}

// helper function to render all posts to view
// note: we empty and re-render the collection each time our post data changes
function render() {
    // empty existing posts from view
    $("#result").empty();

    // pass `allBooks` into the template function
    var HashsHtml = getAllHashsHtml(allHashs);

    // append html to the view
    $hashsList.append(HashsHtml);
};