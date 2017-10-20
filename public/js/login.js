console.log("Sanity Check: JS is working!");


$(document).ready(function(){

	$('#getPosts').submit(function(event){
		event.preventDefault();
$.ajax({
    url: "http://api.twitter.com/oauth/request_token",
    type: "POST",
    contentType: "json",
    Authorization:
OAuth oauth_consumer_key="xvz1evFS4wEEPTGEFPHBog",
oauth_nonce="kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg",
oauth_signature="tnnArxj06cWHq44gCs1OSKk%2FjLY%3D",
oauth_signature_method="HMAC-SHA1",
oauth_timestamp="1318622958",
oauth_token="370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb",
oauth_version="1.0",
    success: function (data) {
        debugger;
    },
    error: function (a, b, c) {
        debugger;
    }
});




  });