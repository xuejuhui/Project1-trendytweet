console.log("%cGETOUT!", "color: red; font-size:150px;");
let $hashsList;
let allHashs = [];
let allResult;
const hashUrl = '/api/hashs';
let $tweetList;


$(document).ready(function() {

    $.ajax({
        method: 'GET',
        url: 'api/hashs',
        success: postHashs,
        error: errorHashs
    });

    $hashsList = $('#result');
    $tweetList = $('#result2');
    $('.mainBody').on('submit', "#getPosts", function(event) {
        event.preventDefault();
        let search = $('#search').val();
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


    })

});

let postHashs = json => {
    json.forEach(function(hashs) {
        renderHash(hashs)

    });
}

let renderHash = hashObj => {
    $(".appendedSearches").append(`
			<div class="renderedHash">
				<p>${hashObj.hash}</p>
			</div>
			`);
};

function errorHashs(err) {
    console.log('error', err);
}

let hashSuccess = json => {
    console.log(json);
    $('#search').val();
    allHashs.push(json);
    render();
    let searchQuery = $('#search').val();
    $(".appendedSearches").append(`<br>${searchQuery}<br>`);
    $('#getPosts input').val('');
}

function willSuccess(json) {
    allHashs = "";
    allHashs = json;
    console.log(allHashs);
    render();
}

function getHashHtml(hash) {
    let abc = ''
    for (i = 0; i < hash.statuses.length; i++) {
        let sb = hash.statuses[i].text
        abc += `<hr>
          <p>
            <b>${sb}</b>
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
    $('#result').html('');


    // pass `allBooks` into the template function
    let HashsHtml = getAllHashsHtml(allHashs);

    // append html to the view
    $hashsList.append(HashsHtml);
    allHashs = []


};