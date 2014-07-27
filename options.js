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
	$( "div#response").html('<div class="alert alert-success" role="alert">Bitly configuration stored.</div>');
	return false;
});