$(document).ready(function() {
	chrome.storage.sync.get('userName', function (result) {
		$("input#username").val(result.userName);
	});
	chrome.storage.sync.get('apiKey', function (result) {
		$("input#apikey").val(result.apiKey);
	});
});

$("button#save").click(function() {
	var userName = $("input#username").val();
	chrome.storage.sync.set({'userName': userName});

	var apiKey = $("input#apikey").val();
	chrome.storage.sync.set({'apiKey': apiKey});

	alertSuccess('Bitly configuration stored.');

	return false;
});

function alertSuccess(text){
	$( "div#response").html('<div class="alert alert-success" role="alert"><a href="#" class="close" data-dismiss="alert">&times;</a>'+text+'</div>');
}